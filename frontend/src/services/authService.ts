import { apiClient } from './api';
import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_KEY } from '@/utils/constants';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.data) {
      const { token, user } = response.data;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    return response.data!;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    
    if (response.data) {
      const { token, user } = response.data;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    
    return response.data!;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    return response.data!;
  },

  getStoredToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getStoredUser(): User | null {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData) as User;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};

export default authService;
