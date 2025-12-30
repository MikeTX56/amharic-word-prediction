export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user_data';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  NOT_FOUND: '/404',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PREDICTIONS: {
    CREATE: '/predictions',
    LIST: '/predictions',
    GET: (id: string) => `/predictions/${id}`,
    DELETE: (id: string) => `/predictions/${id}`,
    HISTORY: '/predictions/history',
    STATS: '/predictions/stats',
  },
  ADMIN: {
    STATS: '/admin/stats',
    USERS: '/admin/users',
    MODEL: '/admin/model',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  MAX_PER_PAGE: 100,
} as const;

export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;

export const MAX_PREDICTIONS = 5;
