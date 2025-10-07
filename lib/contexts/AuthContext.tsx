import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { AuthService } from '../auth'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>

  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updatePassword: (password: string) => Promise<{ error: any }>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentSession = await AuthService.getCurrentSession()
        setSession(currentSession)
        setUser(currentSession?.user || null)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const unsubscribe = AuthService.onAuthStateChange((user, session) => {
      setUser(user)
      setSession(session)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, displayName?: string) => {
    setLoading(true)
    try {
      const { error } = await AuthService.signUp({ email, password, displayName })
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await AuthService.signIn({ email, password })
      return { error }
    } finally {
      setLoading(false)
    }
  }



  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await AuthService.signOut()
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    const { error } = await AuthService.resetPassword(email)
    return { error }
  }

  const updatePassword = async (password: string) => {
    const { error } = await AuthService.updatePassword(password)
    return { error }
  }

  const refreshSession = async () => {
    const { session: newSession } = await AuthService.refreshSession()
    if (newSession) {
      setSession(newSession)
      setUser(newSession.user)
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook to require authentication
export function useRequireAuth() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return { user: null, loading: true }
  }
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return { user, loading: false }
}