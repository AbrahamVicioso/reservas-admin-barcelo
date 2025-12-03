import axios from 'axios';
import type {
  RegisterRequest,
  LoginRequest,
  AccessTokenResponse,
  RefreshRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  InfoResponse,
} from '../types';

const AUTH_API_BASE_URL = 'http://localhost:5117';

const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_info';

export const authService = {
  register: async (data: RegisterRequest): Promise<void> => {
    await authApi.post('/register', data);
  },

  login: async (data: LoginRequest): Promise<AccessTokenResponse> => {
    const response = await authApi.post<AccessTokenResponse>('/login', data);
    if (response.data.accessToken) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  refresh: async (refreshToken: string): Promise<AccessTokenResponse> => {
    const response = await authApi.post<AccessTokenResponse>('/refresh', {
      refreshToken,
    } as RefreshRequest);
    if (response.data.accessToken) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    }
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await authApi.post('/forgotPassword', data);
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await authApi.post('/resetPassword', data);
  },

  getUserInfo: async (token: string): Promise<InfoResponse> => {
    const response = await authApi.get<InfoResponse>('/manage/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return response.data;
  },

  getStoredToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getStoredUser: (): InfoResponse | null => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
