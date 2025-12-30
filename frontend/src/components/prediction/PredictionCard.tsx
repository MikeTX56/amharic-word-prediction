import React from 'react';
import { formatDateTime, formatConfidence, truncateText } from '@/utils/formatters';
import type { Prediction } from '@/types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

interface PredictionCardProps {
  prediction: Prediction;
  onDelete?: (id: string) => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  onDelete,
}) => {
  const topPrediction = prediction.predictions[0];

  return (
    <Card hoverable>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Input Text
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {truncateText(prediction.text, 100)}
            </p>
          </div>
          <Badge variant="info" size="sm">
            {prediction.modelVersion}
          </Badge>
        </div>

        {/* Top Prediction */}
        {topPrediction && (
          <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Top Prediction
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary-900 dark:text-primary-200">
                {topPrediction.word}
              </span>
              <Badge variant="success" size="sm">
                {formatConfidence(topPrediction.confidence)}
              </Badge>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDateTime(prediction.timestamp)}
          </p>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(prediction.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PredictionCard;
