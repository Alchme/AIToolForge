import { supabase } from './supabase'
import type { User, Session, AuthError } from '@supabase/supabase-js'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && key && url !== 'your_supabase_project_url' && key !== 'your_supabase_anon_key'
}

export interface AuthResponse {
  user: User | null
  session: Session | null
  error: AuthError | null
}

export interface SignUpData {
  email: string
  password: string
  displayName?: string
}

export interface SignInData {
  email: string
  password: string
}



export class AuthService {
  /**
   * Sign up a new user with email and password
   */
  static async signUp({ email, password, displayName }: SignUpData): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return { 
        user: null, 
        session: null, 
        error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError 
      }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0]
          }
        }
      })

      if (error) {
        return { user: null, session: null, error }
      }

      // If user is created, also create their profile
      if (data.user && !error) {
        await this.createUserProfile(data.user, displayName)
      }

      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: error as AuthError 
      }
    }
  }

  /**
   * Sign in an existing user with email and password
   */
  static async signIn({ email, password }: SignInData): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return { 
        user: null, 
        session: null, 
        error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError 
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      return { user: data.user, session: data.session, error }
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: error as AuthError 
      }
    }
  }



  /**
   * Sign out the current user
   */
  static async signOut(): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Get the current user
   */
  static async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Error getting current user:', error)
        return null
      }

      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Get the current session
   */
  static async getCurrentSession(): Promise<Session | null> {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting current session:', error)
        return null
      }

      return session
    } catch (error) {
      console.error('Error getting current session:', error)
      return null
    }
  }

  /**
   * Listen to authentication state changes
   */
  static onAuthStateChange(callback: (user: User | null, session: Session | null) => void) {
    if (!isSupabaseConfigured()) {
      // Return a no-op unsubscribe function when Supabase is not configured
      return () => {}
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(session?.user || null, session)
      }
    )

    // Return unsubscribe function
    return () => subscription.unsubscribe()
  }

  /**
   * Refresh the current session
   */
  static async refreshSession(): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return { 
        user: null, 
        session: null, 
        error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError 
      }
    }

    try {
      const { data, error } = await supabase.auth.refreshSession()
      return { user: data.user, session: data.session, error }
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: error as AuthError 
      }
    }
  }

  /**
   * Reset password for a user
   */
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Update user password
   */
  static async updatePassword(password: string): Promise<{ error: AuthError | null }> {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured. Please set up Supabase credentials.' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Create user profile in the profiles table
   */
  private static async createUserProfile(user: User, displayName?: string): Promise<void> {
    if (!isSupabaseConfigured()) {
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email!,
          display_name: displayName || user.user_metadata?.display_name || user.email!.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url || null
        })

      if (error) {
        console.error('Error creating user profile:', error)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  /**
   * Get user profile from the profiles table
   */
  static async getUserProfile(userId: string) {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error getting user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, updates: {
    display_name?: string
    avatar_url?: string
  }) {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  }
}