export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SystemStats {
  totalUsers: number;
  totalPredictions: number;
  averageConfidence: number;
  activeUsers: number;
  apiCalls24h: number;
}

export interface AdminStats extends SystemStats {
  modelVersion: string;
  modelAccuracy: number;
  uptime: number;
}
