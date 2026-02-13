/**
 * API Route: Articles
 *
 * Handles article retrieval and analysis
 * Following blueprint API standards
 */

import { NextRequest, NextResponse } from 'next/server'
import { articlesDb } from '@/lib/db/supabase'
import { analyzeArticle } from '@/lib/deepseek/agents'
import { logger, timer } from '@/lib/monitoring/logger'

// GET /api/articles - Retrieve articles
export async function GET(request: NextRequest) {
  const timing = timer('GET /api/articles')

  try {
    const searchParams = request.nextUrl.searchParams
    const topic = searchParams.get('topic')
    const limit = parseInt(searchParams.get('limit') || '20')

    logger.apiRequest('GET', '/api/articles', { topic, limit })

    let articles
    if (topic) {
      articles = await articlesDb.getByTopic(topic, limit)
    } else {
      articles = await articlesDb.getRecent(limit)
    }

    timing.end({ articleCount: articles.length })

    return NextResponse.json({
      success: true,
      data: articles
    })
  } catch (error) {
    timing.end({ error: true })
    logger.apiError('GET', '/api/articles', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles'
      },
      { status: 500 }
    )
  }
}

// POST /api/articles/analyze - Analyze article with AI
export async function POST(request: NextRequest) {
  const timing = timer('POST /api/articles/analyze')

  try {
    const body = await request.json()
    const { title, description, content } = body

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: title, description'
        },
        { status: 400 }
      )
    }

    logger.apiRequest('POST', '/api/articles/analyze', { title })

    // Analyze with DeepSeek
    const analysis = await analyzeArticle({ title, description, content })

    timing.end({ analyzed: true })

    return NextResponse.json({
      success: true,
      data: analysis
    })
  } catch (error) {
    timing.end({ error: true })
    logger.apiError('POST', '/api/articles/analyze', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze article'
      },
      { status: 500 }
    )
  }
}
