import { apiClient } from './api';
import { API_ENDPOINTS } from '@/utils/constants';
import type {
  PredictionRequest,
  PredictionResponse,
  PredictionHistory,
  PredictionStats,
  Prediction,
  PaginationParams,
} from '@/types';

export const predictionService = {
  async createPrediction(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await apiClient.post<PredictionResponse>(
      API_ENDPOINTS.PREDICTIONS.CREATE,
      data
    );
    return response.data!;
  },

  async getPredictionHistory(params?: PaginationParams): Promise<PredictionHistory> {
    const response = await apiClient.get<PredictionHistory>(
      API_ENDPOINTS.PREDICTIONS.HISTORY,
      params
    );
    return response.data!;
  },

  async getPredictionById(id: string): Promise<Prediction> {
    const response = await apiClient.get<Prediction>(
      API_ENDPOINTS.PREDICTIONS.GET(id)
    );
    return response.data!;
  },

  async deletePrediction(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.PREDICTIONS.DELETE(id));
  },

  async getUserStats(): Promise<PredictionStats> {
    const response = await apiClient.get<PredictionStats>(
      API_ENDPOINTS.PREDICTIONS.STATS
    );
    return response.data!;
  },

  exportHistoryAsCSV(predictions: Prediction[]): void {
    const headers = ['ID', 'Text', 'Top Prediction', 'Confidence', 'Model Version', 'Timestamp'];
    const rows = predictions.map(p => [
      p.id,
      p.text,
      p.predictions[0]?.word || '',
      p.predictions[0]?.confidence.toFixed(2) || '',
      p.modelVersion,
      new Date(p.timestamp).toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prediction-history-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};

export default predictionService;
