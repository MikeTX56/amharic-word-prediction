import React from 'react';
import { usePrediction } from '@/hooks/usePrediction';
import { useNotification } from '@/hooks/useNotification';
import { formatDateTime, formatConfidence } from '@/utils/formatters';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Badge from '../common/Badge';

export const PredictionResults: React.FC = () => {
  const { currentPrediction } = usePrediction();
  const { showNotification } = useNotification();

  if (!currentPrediction) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          No predictions yet. Enter text above to get started.
        </p>
      </Card>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copied to clipboard!');
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Predictions
        </h2>
        <Badge variant="info">{currentPrediction.modelVersion}</Badge>
      </div>

      <div className="space-y-4">
        {currentPrediction.predictions.map((prediction, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Badge variant="primary" size="sm">
                  #{prediction.rank}
                </Badge>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {prediction.word}
                </span>
              </div>
              <button
                onClick={() => handleCopy(prediction.word)}
                className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Copy to clipboard"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Confidence
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatConfidence(prediction.confidence)}
                </span>
              </div>
              <ProgressBar
                value={prediction.confidence * 100}
                color={
                  prediction.confidence > 0.7
                    ? 'success'
                    : prediction.confidence > 0.4
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Generated at {formatDateTime(currentPrediction.timestamp)}
        </p>
      </div>
    </Card>
  );
};

export default PredictionResults;
