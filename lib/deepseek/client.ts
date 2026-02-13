/**
 * DeepSeek AI Client
 *
 * Implements streaming and non-streaming requests to DeepSeek API
 * Following blueprint standards for error handling and rate limiting
 */

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface DeepSeekStreamChunk {
  id: string
  choices: Array<{
    delta: {
      role?: string
      content?: string
    }
    finish_reason: string | null
  }>
}

export class DeepSeekClient {
  private apiKey: string
  private baseUrl: string
  private rateLimitDelay: number = 100 // ms between requests

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || ''
    this.baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'

    if (!this.apiKey) {
      console.warn('⚠️  DEEPSEEK_API_KEY not configured')
    }
  }

  /**
   * Non-streaming chat completion
   */
  async chat(
    messages: DeepSeekMessage[],
    options: {
      model?: string
      temperature?: number
      maxTokens?: number
    } = {}
  ): Promise<DeepSeekResponse> {
    const {
      model = 'deepseek-chat',
      temperature = 0.7,
      maxTokens = 2000
    } = options

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new DeepSeekError(`DeepSeek API error: ${response.status} - ${error}`)
      }

      // Rate limiting delay
      await this.delay(this.rateLimitDelay)

      return await response.json()
    } catch (error) {
      if (error instanceof DeepSeekError) throw error
      throw new DeepSeekError(`Failed to call DeepSeek: ${error}`)
    }
  }

  /**
   * Streaming chat completion (for real-time responses)
   */
  async *chatStream(
    messages: DeepSeekMessage[],
    options: {
      model?: string
      temperature?: number
      maxTokens?: number
    } = {}
  ): AsyncGenerator<string, void, unknown> {
    const {
      model = 'deepseek-chat',
      temperature = 0.7,
      maxTokens = 2000
    } = options

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          stream: true
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new DeepSeekError(`DeepSeek API error: ${response.status} - ${error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new DeepSeekError('No response body')

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') return

            try {
              const parsed: DeepSeekStreamChunk = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content
              if (content) {
                yield content
              }
            } catch (e) {
              console.error('Failed to parse stream chunk:', e)
            }
          }
        }
      }

      // Rate limiting delay after stream
      await this.delay(this.rateLimitDelay)
    } catch (error) {
      if (error instanceof DeepSeekError) throw error
      throw new DeepSeekError(`Failed to stream from DeepSeek: ${error}`)
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export class DeepSeekError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DeepSeekError'
  }
}

// Singleton instance
export const deepseekClient = new DeepSeekClient()
