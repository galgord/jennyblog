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
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          excerpt: string
          slug: string
          published: boolean
          featured_image_url: string | null
          author_id: string
          category: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          excerpt: string
          slug: string
          published?: boolean
          featured_image_url?: string | null
          author_id: string
          category?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          published?: boolean
          featured_image_url?: string | null
          author_id?: string
          category?: string | null
          tags?: string[] | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          website: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          testimonial: string
          image_url: string | null
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          testimonial: string
          image_url?: string | null
          published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          testimonial?: string
          image_url?: string | null
          published?: boolean
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