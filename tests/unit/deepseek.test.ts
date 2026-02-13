/**
 * DeepSeek Client Tests
 *
 * Unit tests for DeepSeek integration
 */

import { describe, it, expect, vi } from 'vitest'
import { DeepSeekClient, DeepSeekError } from '@/lib/deepseek/client'

// Mock fetch
global.fetch = vi.fn()

describe('DeepSeekClient', () => {
  let client: DeepSeekClient

  beforeEach(() => {
    client = new DeepSeekClient()
    vi.mocked(fetch).mockClear()
  })

  describe('chat', () => {
    it('should call DeepSeek API with correct parameters', async () => {
      const mockResponse = {
        id: 'test-id',
        choices: [{
          message: {
            role: 'assistant',
            content: 'Test response'
          },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 5,
          total_tokens: 15
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      const result = await client.chat([
        { role: 'user', content: 'Test message' }
      ])

      expect(result.choices[0].message.content).toBe('Test response')
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chat/completions'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-deepseek-key'
          })
        })
      )
    })

    it('should handle API errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        text: async () => 'API Error'
      } as any)

      await expect(
        client.chat([{ role: 'user', content: 'Test' }])
      ).rejects.toThrow(DeepSeekError)
    })
  })

  describe('error handling', () => {
    it('should warn if API key not configured', () => {
      const originalKey = process.env.DEEPSEEK_API_KEY
      delete process.env.DEEPSEEK_API_KEY

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // @ts-ignore - testing private property access
      const newClient = new DeepSeekClient()

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('DEEPSEEK_API_KEY not configured')
      )

      consoleSpy.mockRestore()
      process.env.DEEPSEEK_API_KEY = originalKey
    })
  })
})
