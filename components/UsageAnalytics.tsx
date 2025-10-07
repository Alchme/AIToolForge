import React, { useState, useEffect } from 'react';
import { UsageService } from '../lib/services/usageService';
import { useAuth } from '../lib/contexts/AuthContext';
import * as Icons from './Icons';

interface UsageAnalyticsProps {
  className?: string;
}

const UsageAnalytics: React.FC<UsageAnalyticsProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsage: 0,
    last24Hours: 0,
    favoriteTools: [] as Array<{ toolId: string; count: number }>
  });
  const [trendingTools, setTrendingTools] = useState<Array<{ toolId: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        
        // Load trending tools (global)
        const trending = await UsageService.getTrendingTools(5);
        setTrendingTools(trending);

        // Load user stats if logged in
        if (user) {
          const userStats = await UsageService.getUserUsageStats(user.id);
          setStats(userStats);
        }
      } catch (error) {
        console.error('Error loading usage analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [user]);

  if (isLoading) {
    return (
      <div className={`bg-[#1e1e1e] border border-gray-800 rounded-xl p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#1e1e1e] border border-gray-800 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icons.ChartBarIcon className="w-5 h-5 text-cyan-400" />
        <h3 className="text-white font-semibold">Usage Analytics</h3>
      </div>

      {/* User Stats (if logged in) */}
      {user && (
        <div className="mb-6">
          <h4 className="text-gray-300 text-sm font-medium mb-3">Your Activity</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#2a2a2a] rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">{stats.totalUsage}</div>
              <div className="text-xs text-gray-400">Total Uses</div>
            </div>
            <div className="bg-[#2a2a2a] rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">{stats.last24Hours}</div>
              <div className="text-xs text-gray-400">Last 24h</div>
            </div>
          </div>

          {stats.favoriteTools.length > 0 && (
            <div className="mb-4">
              <h5 className="text-gray-400 text-xs font-medium mb-2">Your Top Tools</h5>
              <div className="space-y-1">
                {stats.favoriteTools.slice(0, 3).map((tool, index) => (
                  <div key={tool.toolId} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 truncate">
                      {tool.toolId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-gray-500">{tool.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trending Tools (global) */}
      {trendingTools.length > 0 && (
        <div>
          <h4 className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-1">
            <Icons.FireIcon className="w-4 h-4 text-orange-400" />
            Trending Now
          </h4>
          <div className="space-y-2">
            {trendingTools.slice(0, 5).map((tool, index) => (
              <div key={tool.toolId} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-medium">#{index + 1}</span>
                  <span className="text-gray-300 truncate">
                    {tool.toolId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                <span className="text-gray-500">{tool.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!user && trendingTools.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          <Icons.ChartBarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Sign in to see your usage analytics</p>
        </div>
      )}
    </div>
  );
};

export default UsageAnalytics;