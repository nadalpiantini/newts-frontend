/**
 * Database Layer - Supabase Client with Type Safety
 *
 * Provides a type-safe interface to Supabase with error handling
 * Following blueprint database layer standards
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './types'

// ============================================================================
// CLIENT CONFIGURATION
// ============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// ============================================================================
// DATABASE ERROR HANDLING
// ============================================================================

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

/**
 * Wrap database queries with consistent error handling
 */
export async function handleDbQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  context: string
): Promise<T> {
  try {
    const { data, error } = await queryFn()

    if (error) {
      throw new DatabaseError(
        `${context}: ${error.message}`,
        error.code,
        error
      )
    }

    if (!data) {
      throw new DatabaseError(`${context}: No data returned`)
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) throw error
    throw new DatabaseError(`${context}: Unexpected error`, undefined, error)
  }
}

// ============================================================================
// TABLE QUERY HELPERS
// ============================================================================

/**
 * Topics table queries
 */
export const topicsDb = {
  getAll: () =>
    handleDbQuery(
      () => supabase.from('newts_topics').select('*').eq('is_active', true),
      'Get topics'
    ),

  getBySlug: (slug: string) =>
    handleDbQuery(
      () => supabase.from('newts_topics').select('*').eq('slug', slug).single(),
      'Get topic by slug'
    )
}

/**
 * Articles table queries
 */
export const articlesDb = {
  getByTopic: (topicSlug: string, limit = 20) =>
    handleDbQuery(
      () =>
        supabase
          .from('newts_articles')
          .select('*')
          .eq('category', topicSlug)
          .order('published_at', { ascending: false })
          .limit(limit),
      'Get articles by topic'
    ),

  getRecent: (limit = 20) =>
    handleDbQuery(
      () =>
        supabase
          .from('newts_articles')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(limit),
      'Get recent articles'
    ),

  getById: (id: string) =>
    handleDbQuery(
      () => supabase.from('newts_articles').select('*').eq('id', id).single(),
      'Get article by ID'
    )
}

/**
 * Boards table queries
 */
export const boardsDb = {
  getByUser: (userId: string) =>
    handleDbQuery(
      () => supabase.from('newts_boards').select('*').eq('user_id', userId),
      'Get boards by user'
    ),

  create: (board: {
    user_id: string
    name: string
    description?: string
    icon?: string
    color: string
  }) =>
    handleDbQuery(
      () => supabase.from('newts_boards').insert(board).select().single(),
      'Create board'
    ),

  update: (id: string, updates: Partial<Database['public']['Tables']['newts_boards']['Row']>) =>
    handleDbQuery(
      () => supabase.from('newts_boards').update(updates).eq('id', id).select().single(),
      'Update board'
    ),

  delete: (id: string) =>
    handleDbQuery(
      () => supabase.from('newts_boards').delete().eq('id', id),
      'Delete board'
    )
}
