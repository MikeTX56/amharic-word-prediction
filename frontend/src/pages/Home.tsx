import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import MainLayout from '@/components/layout/MainLayout';
import PredictionForm from '@/components/prediction/PredictionForm';
import PredictionResults from '@/components/prediction/PredictionResults';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Amharic Word Prediction
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Powered by advanced machine learning, our app helps you write Amharic text
          faster with intelligent word predictions.
        </p>
        {!isAuthenticated && (
          <div className="flex gap-4 justify-center">
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Quick Prediction */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <PredictionForm />
          <PredictionResults />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <div className="text-primary-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Fast Predictions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Get instant word predictions powered by state-of-the-art ML models
            </p>
          </Card>

          <Card>
            <div className="text-secondary-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              High Accuracy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Our models are trained on extensive Amharic datasets for maximum accuracy
            </p>
          </Card>

          <Card>
            <div className="text-accent-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              History Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Keep track of all your predictions with our comprehensive history feature
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of users who are already writing Amharic faster with our AI-powered predictions.
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" size="lg">
                Create Free Account
              </Button>
            </Link>
          </Card>
        </section>
      )}
    </MainLayout>
  );
};

export default Home;
