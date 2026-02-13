import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Database = {
  public: {
    Tables: {
      newts_topics: {
        Row: {
          id: string
          slug: string
          name: string
          icon: string | null
          color: string | null
          is_active: boolean
        }
      }
      newts_articles: {
        Row: {
          id: string
          title: string
          url: string
          description: string
          source: string
          category: string
          image_url: string | null
          published_at: string
        }
      }
      newts_boards: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          icon: string | null
          color: string
          article_count: number
          created_at: string
        }
      }
    }
  }
}
