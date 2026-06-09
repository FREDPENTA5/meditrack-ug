import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, LoginResponse } from '@meditrack/shared';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL } from './apiBase';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );

    if (response.data.success && response.data.data) {
      const { user, accessToken } = response.data.data;
      useAuthStore.getState().setAuth(user, accessToken);
      return accessToken;
    }

    return null;
  } catch {
    useAuthStore.getState().clearAuth();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;

    if (!newToken) {
      return Promise.reject(error);
    }

    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
    }

    return api(originalRequest);
  },
);

export { api };
