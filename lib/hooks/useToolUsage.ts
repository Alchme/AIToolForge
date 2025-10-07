import { useState, useEffect, useCallback } from 'react'
import { UsageService } from '../services/usageService'
import type { LibraryTool } from '../../types'

export const useToolUsage = () => {
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load initial usage counts
  useEffect(() => {
    const loadUsageCounts = async () => {
      try {
        setIsLoading(true)
        const counts = await UsageService.getAllToolUsageCounts()
        setUsageCounts(counts)
      } catch (error) {
        console.error('Error loading usage counts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsageCounts()

    // Refresh counts every 5 minutes
    const interval = setInterval(loadUsageCounts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Track tool usage
  const trackUsage = useCallback(async (toolId: string, toolName: string) => {
    try {
      // Track in database
      await UsageService.trackToolUsage(toolId, toolName)
      
      // Update local count immediately for better UX
      setUsageCounts(prev => ({
        ...prev,
        [toolId]: (prev[toolId] || 0) + 1
      }))
    } catch (error) {
      console.error('Error tracking tool usage:', error)
    }
  }, [])

  // Get usage count for a specific tool
  const getUsageCount = useCallback((toolId: string): number => {
    return usageCounts[toolId] || 0
  }, [usageCounts])

  // Update tools with real usage counts
  const updateToolsWithUsage = useCallback((tools: LibraryTool[]): LibraryTool[] => {
    return tools.map(tool => ({
      ...tool,
      uses: getUsageCount(tool.id)
    }))
  }, [getUsageCount])

  return {
    usageCounts,
    isLoading,
    trackUsage,
    getUsageCount,
    updateToolsWithUsage
  }
}

export default useToolUsage