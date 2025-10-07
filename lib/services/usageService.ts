import { supabase } from '../supabase'
import type { LibraryTool } from '../../types'

export class UsageService {
  /**
   * Track tool usage - records usage and updates global tool usage count
   * Works for both authenticated and anonymous users
   */
  static async trackToolUsage(toolId: string, toolName: string): Promise<void> {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
        // Supabase not configured - skip tracking but don't break the app
        return
      }

      // Get current user (can be null for anonymous users)
      const { data: { user } } = await supabase.auth.getUser()
      
      // Record the usage event (user_id can be null for anonymous usage)
      const { error: usageError } = await supabase
        .from('tool_usage')
        .insert({
          tool_id: toolId,
          user_id: user?.id || null,
          used_at: new Date().toISOString()
        })

      if (usageError) {
        console.error('Error recording tool usage:', usageError)
        // Don't throw error - usage tracking shouldn't break the app
      }
      
    } catch (error) {
      console.error('Error tracking tool usage:', error)
      // Don't throw error - usage tracking shouldn't break the app
    }
  }

  /**
   * Get global usage count for a specific tool (all time)
   */
  static async getToolUsageCount(toolId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('tool_usage')
        .select('id')
        .eq('tool_id', toolId)

      if (error) {
        console.error('Error fetching tool usage count:', error)
        return 0
      }

      return data?.length || 0
    } catch (error) {
      console.error('Error getting tool usage count:', error)
      return 0
    }
  }

  /**
   * Get usage count for a specific tool in the last 24 hours
   */
  static async getToolUsageCount24h(toolId: string): Promise<number> {
    try {
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

      const { data, error } = await supabase
        .from('tool_usage')
        .select('id')
        .eq('tool_id', toolId)
        .gte('used_at', twentyFourHoursAgo.toISOString())

      if (error) {
        console.error('Error fetching tool usage count:', error)
        return 0
      }

      return data?.length || 0
    } catch (error) {
      console.error('Error getting tool usage count:', error)
      return 0
    }
  }

  /**
   * Get global usage counts for all tools (all time) - visible to all users
   */
  static async getAllToolUsageCounts(): Promise<Record<string, number>> {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
        // Return empty counts if Supabase not configured
        return {}
      }

      const { data, error } = await supabase
        .from('tool_usage')
        .select('tool_id')

      if (error) {
        console.error('Error fetching all tool usage counts:', error)
        return {}
      }

      // Count occurrences of each tool_id
      const counts: Record<string, number> = {}
      data?.forEach(usage => {
        if (usage.tool_id) {
          counts[usage.tool_id] = (counts[usage.tool_id] || 0) + 1
        }
      })

      return counts
    } catch (error) {
      console.error('Error getting all tool usage counts:', error)
      return {}
    }
  }

  /**
   * Get usage counts for all tools in the last 24 hours
   */
  static async getAllToolUsageCounts24h(): Promise<Record<string, number>> {
    try {
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

      const { data, error } = await supabase
        .from('tool_usage')
        .select('tool_id')
        .gte('used_at', twentyFourHoursAgo.toISOString())

      if (error) {
        console.error('Error fetching all tool usage counts:', error)
        return {}
      }

      // Count occurrences of each tool_id
      const counts: Record<string, number> = {}
      data?.forEach(usage => {
        if (usage.tool_id) {
          counts[usage.tool_id] = (counts[usage.tool_id] || 0) + 1
        }
      })

      return counts
    } catch (error) {
      console.error('Error getting all tool usage counts:', error)
      return {}
    }
  }

  /**
   * Get user's personal usage statistics
   */
  static async getUserUsageStats(userId: string): Promise<{
    totalUsage: number
    last24Hours: number
    favoriteTools: Array<{ toolId: string; count: number }>
  }> {
    try {
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

      // Get all user usage
      const { data: allUsage, error: allError } = await supabase
        .from('tool_usage')
        .select('tool_id, used_at')
        .eq('user_id', userId)

      if (allError) {
        console.error('Error fetching user usage stats:', allError)
        return { totalUsage: 0, last24Hours: 0, favoriteTools: [] }
      }

      // Calculate stats
      const totalUsage = allUsage?.length || 0
      const last24Hours = allUsage?.filter(usage => 
        new Date(usage.used_at) >= twentyFourHoursAgo
      ).length || 0

      // Calculate favorite tools (most used)
      const toolCounts: Record<string, number> = {}
      allUsage?.forEach(usage => {
        if (usage.tool_id) {
          toolCounts[usage.tool_id] = (toolCounts[usage.tool_id] || 0) + 1
        }
      })

      const favoriteTools = Object.entries(toolCounts)
        .map(([toolId, count]) => ({ toolId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5) // Top 5 favorite tools

      return {
        totalUsage,
        last24Hours,
        favoriteTools
      }
    } catch (error) {
      console.error('Error getting user usage stats:', error)
      return { totalUsage: 0, last24Hours: 0, favoriteTools: [] }
    }
  }

  /**
   * Get trending tools (most used in last 24 hours)
   */
  static async getTrendingTools(limit: number = 10): Promise<Array<{ toolId: string; count: number }>> {
    try {
      const twentyFourHoursAgo = new Date()
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

      const { data, error } = await supabase
        .from('tool_usage')
        .select('tool_id')
        .gte('used_at', twentyFourHoursAgo.toISOString())

      if (error) {
        console.error('Error fetching trending tools:', error)
        return []
      }

      // Count occurrences and sort
      const counts: Record<string, number> = {}
      data?.forEach(usage => {
        if (usage.tool_id) {
          counts[usage.tool_id] = (counts[usage.tool_id] || 0) + 1
        }
      })

      return Object.entries(counts)
        .map(([toolId, count]) => ({ toolId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
    } catch (error) {
      console.error('Error getting trending tools:', error)
      return []
    }
  }
}