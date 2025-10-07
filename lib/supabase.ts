import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  !supabaseUrl.includes('placeholder')

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured. Authentication features will be disabled. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key', 
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
)

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          name: string
          messages: any[]
          system_instruction: string | null
          icon: string | null
          convo_type: 'builder' | 'agent' | 'image-generator'
          editing_tool_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          messages?: any[]
          system_instruction?: string | null
          icon?: string | null
          convo_type?: 'builder' | 'agent' | 'image-generator'
          editing_tool_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          messages?: any[]
          system_instruction?: string | null
          icon?: string | null
          convo_type?: 'builder' | 'agent' | 'image-generator'
          editing_tool_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_tools: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          html: string
          icon_name: string
          sub_type: string
          is_public: boolean
          uses: number
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          description?: string | null
          html: string
          icon_name?: string
          sub_type?: string
          is_public?: boolean
          uses?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          html?: string
          icon_name?: string
          sub_type?: string
          is_public?: boolean
          uses?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      tool_usage: {
        Row: {
          id: string
          tool_id: string | null
          user_id: string | null
          used_at: string
        }
        Insert: {
          id?: string
          tool_id?: string | null
          user_id?: string | null
          used_at?: string
        }
        Update: {
          id?: string
          tool_id?: string | null
          user_id?: string | null
          used_at?: string
        }
      }
      tool_likes: {
        Row: {
          tool_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          tool_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          tool_id?: string
          user_id?: string
          created_at?: string
        }
      }
      app_state: {
        Row: {
          user_id: string
          key: string
          value: any
          updated_at: string
        }
        Insert: {
          user_id: string
          key: string
          value: any
          updated_at?: string
        }
        Update: {
          user_id?: string
          key?: string
          value?: any
          updated_at?: string
        }
      }
    }
  }
}

// Typed Supabase client
export type SupabaseClient = typeof supabase