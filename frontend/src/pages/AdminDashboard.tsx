import React, { useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/utils/constants';
import { formatNumber } from '@/utils/formatters';
import type { AdminStats } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Spinner from '@/components/common/Spinner';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await apiClient.get<AdminStats>(API_ENDPOINTS.ADMIN.STATS);
      setStats(response.data!);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Users
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? formatNumber(stats.totalUsers) : '0'}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Predictions
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? formatNumber(stats.totalPredictions) : '0'}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Active Users
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? formatNumber(stats.activeUsers) : '0'}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                API Calls (24h)
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? formatNumber(stats.apiCalls24h) : '0'}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Avg. Confidence
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? `${(stats.averageConfidence * 100).toFixed(1)}%` : '0%'}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                System Uptime
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats ? `${(stats.uptime / 3600).toFixed(1)}h` : '0h'}
              </p>
            </div>
          </Card>
        </div>

        {/* Model Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Model Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <Badge variant="info">{stats?.modelVersion || 'N/A'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                <Badge variant="success">
                  {stats ? `${(stats.modelAccuracy * 100).toFixed(1)}%` : 'N/A'}
                </Badge>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-left">
                Manage Users
              </button>
              <button className="w-full px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-left">
                View API Logs
              </button>
              <button className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-left">
                Model Settings
              </button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New user registration
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 minutes ago
                </p>
              </div>
              <Badge variant="success">New</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Model updated to v2.1.0
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1 hour ago
                </p>
              </div>
              <Badge variant="info">Update</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  High API usage detected
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3 hours ago
                </p>
              </div>
              <Badge variant="warning">Alert</Badge>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
