export interface Prediction {
  id: string;
  text: string;
  predictions: PredictionResult[];
  modelVersion: string;
  timestamp: string;
  userId?: string;
}

export interface PredictionResult {
  word: string;
  confidence: number;
  rank: number;
}

export interface PredictionRequest {
  text: string;
}

export interface PredictionResponse {
  id: string;
  predictions: PredictionResult[];
  modelVersion: string;
  timestamp: string;
}

export interface PredictionHistory {
  predictions: Prediction[];
  total: number;
  page: number;
  perPage: number;
}

export interface PredictionStats {
  totalPredictions: number;
  averageConfidence: number;
  topWords: string[];
  recentActivity: number;
}
