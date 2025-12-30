import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
