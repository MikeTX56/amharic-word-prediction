import React, { useEffect, useState } from 'react';
import { usePrediction } from '@/hooks/usePrediction';
import { formatNumber } from '@/utils/formatters';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Spinner from '@/components/common/Spinner';
import HistoryTable from '@/components/prediction/HistoryTable';

export const Dashboard: React.FC = () => {
  const {
    history,
    stats,
    isLoading,
    fetchHistory,
    fetchStats,
    deletePrediction,
    exportHistory,
  } = usePrediction();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchStats();
    loadHistory(1);
  }, []);

  const loadHistory = async (page: number) => {
    const result = await fetchHistory(page, perPage);
    setCurrentPage(page);
    setTotalPages(Math.ceil(result.total / perPage));
  };

  const handlePageChange = (page: number) => {
    loadHistory(page);
  };

  const handleDelete = async (id: string) => {
    await deletePrediction(id);
    loadHistory(currentPage);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <Button variant="primary" onClick={exportHistory}>
            Export History
          </Button>
        </div>

        {/* Stats Cards */}
        {isLoading && !stats ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Predictions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalPredictions)}
                  </p>
                </div>
                <div className="text-primary-600">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Avg. Confidence
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats.averageConfidence * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-secondary-600">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Recent Activity
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.recentActivity)}
                  </p>
                </div>
                <div className="text-accent-600">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Top Predictions
                </p>
                <div className="flex flex-wrap gap-2">
                  {stats.topWords.slice(0, 3).map((word, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ) : null}

        {/* History Table */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Prediction History
          </h2>
          <HistoryTable
            predictions={history}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
