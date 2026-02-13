/**
 * API Route: Topics
 *
 * Handles topic retrieval and management
 * Following blueprint API standards
 */

import { NextRequest, NextResponse } from 'next/server'
import { topicsDb } from '@/lib/db/supabase'
import { logger, timer } from '@/lib/monitoring/logger'

// GET /api/topics - Retrieve all active topics
export async function GET() {
  const timing = timer('GET /api/topics')

  try {
    logger.apiRequest('GET', '/api/topics')

    const topics = await topicsDb.getAll()

    timing.end({ topicCount: topics.length })

    return NextResponse.json({
      success: true,
      data: topics
    })
  } catch (error) {
    timing.end({ error: true })
    logger.apiError('GET', '/api/topics', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch topics'
      },
      { status: 500 }
    )
  }
}
