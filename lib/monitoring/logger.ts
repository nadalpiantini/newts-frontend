/**
 * Structured Logging System
 *
 * Provides consistent, structured logging across the application
 * Following blueprint monitoring standards
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogContext {
  [key: string]: any
}

interface LogEntry {
  level: LogLevel
  message: string
  context?: LogContext
  timestamp: string
  environment: string
}

class Logger {
  private environment: string
  private isDevelopment: boolean

  constructor() {
    this.environment = process.env.NODE_ENV || 'development'
    this.isDevelopment = this.environment === 'development'
  }

  private formatMessage(entry: LogEntry): string {
    const { level, message, context, timestamp } = entry

    if (this.isDevelopment) {
      // Pretty print for development
      const contextStr = context ? ` ${JSON.stringify(context)}` : ''
      return `[${timestamp}] ${level}: ${message}${contextStr}`
    }

    // JSON for production
    return JSON.stringify(entry)
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      environment: this.environment
    }

    const formatted = this.formatMessage(entry)

    switch (level) {
      case LogLevel.DEBUG:
        if (this.isDevelopment) console.debug(formatted)
        break
      case LogLevel.INFO:
        console.info(formatted)
        break
      case LogLevel.WARN:
        console.warn(formatted)
        break
      case LogLevel.ERROR:
        console.error(formatted)
        break
    }
  }

  debug(message: string, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: LogContext) {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: LogContext) {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, context?: LogContext) {
    this.log(LogLevel.ERROR, message, context)
  }

  // Specialized logging methods
  apiRequest(method: string, path: string, context?: LogContext) {
    this.info(`API ${method} ${path}`, context)
  }

  apiError(method: string, path: string, error: any, context?: LogContext) {
    this.error(`API ${method} ${path} failed`, {
      ...context,
      error: error.message || String(error)
    })
  }

  deepSeekRequest(operation: string, context?: LogContext) {
    this.info(`DeepSeek ${operation}`, context)
  }

  deepSeekError(operation: string, error: any, context?: LogContext) {
    this.error(`DeepSeek ${operation} failed`, {
      ...context,
      error: error.message || String(error)
    })
  }

  dbQuery(table: string, operation: string, context?: LogContext) {
    this.debug(`DB ${table} ${operation}`, context)
  }

  dbError(table: string, operation: string, error: any, context?: LogContext) {
    this.error(`DB ${table} ${operation} failed`, {
      ...context,
      error: error.message || String(error)
    })
  }
}

// Singleton instance
export const logger = new Logger()

/**
 * Performance timing helper
 */
export class PerformanceTimer {
  private label: string
  private startTime: number

  constructor(label: string) {
    this.label = label
    this.startTime = Date.now()
  }

  end(context?: LogContext) {
    const duration = Date.now() - this.startTime
    logger.info(`${this.label} completed`, {
      ...context,
      duration: `${duration}ms`
    })
    return duration
  }
}

/**
 * Create a performance timer
 */
export function timer(label: string): PerformanceTimer {
  return new PerformanceTimer(label)
}
