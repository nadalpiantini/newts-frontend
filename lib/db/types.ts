/**
 * Database Types
 *
 * Generated TypeScript types for Supabase tables
 * Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/db/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
        Insert: {
          id?: string
          slug: string
          name: string
          icon?: string | null
          color?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          icon?: string | null
          color?: string | null
          is_active?: boolean
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
        Insert: {
          id?: string
          title: string
          url: string
          description: string
          source: string
          category: string
          image_url?: string | null
          published_at: string
        }
        Update: {
          id?: string
          title?: string
          url?: string
          description?: string
          source?: string
          category?: string
          image_url?: string | null
          published_at?: string
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
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          icon?: string | null
          color: string
          article_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string
          article_count?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
