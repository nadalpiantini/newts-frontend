/**
 * DeepSeek AI Agents for News Analysis
 *
 * Implements specialized agents for different analysis tasks
 * Following blueprint agentic AI methodology
 */

import { deepseekClient, DeepSeekMessage } from './client'

// ============================================================================
// SYSTEM PROMPTS
// ============================================================================

const SYSTEM_PROMPTS = {
  strategicAnalyst: `You are a Strategic News Analyst specializing in identifying high-impact developments.

Your role is to evaluate news articles and determine their strategic importance for business leaders, investors, and decision-makers.

SCORING CRITERIA (0-100):
1. Strategic Impact (0-100):
   - 90-100: Existential threat/opportunity, industry-shifting
   - 70-89: Major competitive impact, significant market shift
   - 50-69: Moderate impact, tactical implications
   - Below 50: Low strategic value, operational only

2. Novelty Score (0-100):
   - 90-100: Breakthrough, unprecedented development
   - 70-89: Significant innovation, notable advancement
   - 50-69: Incremental improvement, expected evolution
   - Below 50: Routine, predictable, derivative

3. Momentum Assessment (rising/stable/declining):
   - Consider: growth trajectory, adoption rate, investment flows
   - Rising: Accelerating adoption, increasing attention
   - Stable: Consistent patterns, established trend
   - Declining: Losing relevance, decreasing impact

OUTPUT FORMAT (JSON only):
{
  "strategic_impact": number,
  "novelty_score": number,
  "momentum": "rising" | "stable" | "declining",
  "sector": string,
  "why_it_matters": "Brief 1-sentence explanation of strategic significance",
  "key_insights": ["insight 1", "insight 2", "insight 3"],
  "related_topics": ["topic1", "topic2"]
}`,

  topicClassifier: `You are a Topic Classification Specialist for news articles.

Your role is to assign precise, high-level categories to news articles.

CLASSIFICATION RULES:
- Use broad, strategic categories (AI, Climate, Finance, Healthcare, etc.)
- Prefer 2-3 word topics over single words
- Map niche topics to broader categories
- Assign ONLY ONE primary topic

VALID TOPICS:
- Artificial Intelligence
- Clean Energy & Climate
- Financial Markets
- Healthcare & Biotech
- Geopolitics & Defense
- Enterprise Technology
- Consumer Technology
- Science & Research
- Policy & Regulation
- Markets & Economy

OUTPUT FORMAT (JSON only):
{
  "primary_topic": "exact topic name from list",
  "confidence": number (0-100),
  "reasoning": "brief explanation"
}`,

  summarizer: `You are a News Summarizer specializing in concise, informative summaries.

Your role is to create clear, factual summaries that capture essential information without editorial voice.

SUMMARY GUIDELINES:
- Length: 1-2 sentences (max 50 words)
- Focus: What happened + why it matters
- Style: Objective, factual, no speculation
- Avoid: Marketing language, hype, opinions

OUTPUT: Plain text summary only.`
}

// ============================================================================
// AGENT FUNCTIONS
// ============================================================================

export interface StrategicAnalysis {
  strategic_impact: number
  novelty_score: number
  momentum: 'rising' | 'stable' | 'declining'
  sector: string
  why_it_matters: string
  key_insights: string[]
  related_topics: string[]
}

export interface TopicClassification {
  primary_topic: string
  confidence: number
  reasoning: string
}

/**
 * Agent: Strategic Analyst
 * Evaluates strategic importance and impact
 */
export async function analyzeStrategicImportance(article: {
  title: string
  description: string
  content?: string
}): Promise<StrategicAnalysis> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPTS.strategicAnalyst
    },
    {
      role: 'user',
      content: `Analyze this article:\n\nTITLE: ${article.title}\n\nDESCRIPTION: ${article.description}\n\n${article.content ? `CONTENT: ${article.content}` : ''}`
    }
  ]

  try {
    const response = await deepseekClient.chat(messages, {
      temperature: 0.3, // Lower temperature for consistent scoring
      maxTokens: 500
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from DeepSeek')

    // Parse JSON response
    const analysis = JSON.parse(content) as StrategicAnalysis

    // Validate response structure
    if (
      typeof analysis.strategic_impact !== 'number' ||
      typeof analysis.novelty_score !== 'number' ||
      !['rising', 'stable', 'declining'].includes(analysis.momentum)
    ) {
      throw new Error('Invalid response structure from DeepSeek')
    }

    return analysis
  } catch (error) {
    console.error('Strategic analysis failed:', error)
    // Return fallback values
    return {
      strategic_impact: 50,
      novelty_score: 50,
      momentum: 'stable',
      sector: 'General',
      why_it_matters: 'Analysis unavailable',
      key_insights: [],
      related_topics: []
    }
  }
}

/**
 * Agent: Topic Classifier
 * Assigns primary topic to articles
 */
export async function classifyTopic(article: {
  title: string
  description: string
}): Promise<TopicClassification> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPTS.topicClassifier
    },
    {
      role: 'user',
      content: `Classify this article:\n\nTITLE: ${article.title}\n\nDESCRIPTION: ${article.description}`
    }
  ]

  try {
    const response = await deepseekClient.chat(messages, {
      temperature: 0.2, // Very low for consistent classification
      maxTokens: 100
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from DeepSeek')

    const classification = JSON.parse(content) as TopicClassification
    return classification
  } catch (error) {
    console.error('Topic classification failed:', error)
    return {
      primary_topic: 'General',
      confidence: 0,
      reasoning: 'Classification unavailable'
    }
  }
}

/**
 * Agent: Summarizer
 * Creates concise summaries of articles
 */
export async function summarizeArticle(article: {
  title: string
  description: string
  content?: string
}): Promise<string> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPTS.summarizer
    },
    {
      role: 'user',
      content: `Summarize this article:\n\nTITLE: ${article.title}\n\nDESCRIPTION: ${article.description}\n\n${article.content ? `CONTENT: ${article.content}` : ''}`
    }
  ]

  try {
    const response = await deepseekClient.chat(messages, {
      temperature: 0.4,
      maxTokens: 100
    })

    const summary = response.choices[0]?.message?.content
    return summary || article.description
  } catch (error) {
    console.error('Summarization failed:', error)
    return article.description // Fallback to original description
  }
}

/**
 * Combined Analysis Pipeline
 * Runs all agents in parallel for efficiency
 */
export async function analyzeArticle(article: {
  title: string
  description: string
  content?: string
}) {
  const [strategic, topic, summary] = await Promise.all([
    analyzeStrategicImportance(article),
    classifyTopic(article),
    summarizeArticle(article)
  ])

  return {
    ...strategic,
    topic: topic.primary_topic,
    topic_confidence: topic.confidence,
    summary
  }
}
