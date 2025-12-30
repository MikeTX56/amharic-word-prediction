import { useState, useCallback } from 'react';
import { predictionService } from '@/services/predictionService';
import { useNotification } from './useNotification';
import type { PredictionRequest, PredictionResponse, Prediction, PredictionStats } from '@/types';

export const usePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResponse | null>(null);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [stats, setStats] = useState<PredictionStats | null>(null);
  const { showNotification } = useNotification();

  const createPrediction = useCallback(async (data: PredictionRequest) => {
    setIsLoading(true);
    try {
      const result = await predictionService.createPrediction(data);
      setCurrentPrediction(result);
      showNotification('success', 'Prediction generated successfully!');
      return result;
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to generate prediction');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const fetchHistory = useCallback(async (page = 1, perPage = 10) => {
    setIsLoading(true);
    try {
      const result = await predictionService.getPredictionHistory({ page, perPage });
      setHistory(result.predictions);
      return result;
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to fetch history');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const deletePrediction = useCallback(async (id: string) => {
    try {
      await predictionService.deletePrediction(id);
      setHistory(prev => prev.filter(p => p.id !== id));
      showNotification('success', 'Prediction deleted successfully!');
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to delete prediction');
      throw error;
    }
  }, [showNotification]);

  const fetchStats = useCallback(async () => {
    try {
      const result = await predictionService.getUserStats();
      setStats(result);
      return result;
    } catch (error: any) {
      showNotification('error', error.message || 'Failed to fetch stats');
      throw error;
    }
  }, [showNotification]);

  const exportHistory = useCallback(() => {
    if (history.length === 0) {
      showNotification('warning', 'No predictions to export');
      return;
    }
    predictionService.exportHistoryAsCSV(history);
    showNotification('success', 'History exported successfully!');
  }, [history, showNotification]);

  return {
    isLoading,
    currentPrediction,
    history,
    stats,
    createPrediction,
    fetchHistory,
    deletePrediction,
    fetchStats,
    exportHistory,
  };
};

export default usePrediction;
