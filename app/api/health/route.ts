/**
 * Health Check Endpoint
 *
 * Provides system health status for monitoring
 * Following blueprint observability standards
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/monitoring/logger'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    database: 'pass' | 'fail'
    deepseek: 'pass' | 'fail'
    memory: 'pass' | 'warn' | 'fail'
  }
}

export async function GET(request: NextRequest) {
  try {
    const checks = {
      database: await checkDatabase(),
      deepseek: await checkDeepSeek(),
      memory: checkMemory()
    }

    const allPass = Object.values(checks).every(c => c === 'pass')
    const status: HealthStatus['status'] = allPass
      ? 'healthy'
      : Object.values(checks).some(c => c === 'fail')
      ? 'unhealthy'
      : 'degraded'

    const health: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      checks
    }

    // Log health check (only in production, to avoid noise in dev)
    if (process.env.NODE_ENV === 'production') {
      logger.info('Health check', health)
    }

    return NextResponse.json(health, {
      status: status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503
    })
  } catch (error) {
    logger.error('Health check failed', { error })

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}

async function checkDatabase(): Promise<'pass' | 'fail'> {
  try {
    // Simple ping to Supabase
    const { supabase } = await import('@/lib/db/supabase')
    const { error } = await supabase.from('newts_topics').select('id').limit(1)

    return error ? 'fail' : 'pass'
  } catch {
    return 'fail'
  }
}

async function checkDeepSeek(): Promise<'pass' | 'fail'> {
  try {
    // Check if API key is configured
    const apiKey = process.env.DEEPSEEK_API_KEY
    return apiKey && apiKey.length > 0 ? 'pass' : 'fail'
  } catch {
    return 'fail'
  }
}

function checkMemory(): 'pass' | 'warn' | 'fail' {
  const used = process.memoryUsage()
  const total = Math.pow(1024, 3) // 1GB

  if (used.heapUsed / total > 0.9) return 'fail'
  if (used.heapUsed / total > 0.7) return 'warn'
  return 'pass'
}
