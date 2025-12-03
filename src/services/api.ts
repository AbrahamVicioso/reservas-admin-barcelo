import axios from 'axios';
import type {
  ActividadRecreativa,
  CreateActividadRecreativaCommand,
  UpdateActividadRecreativaCommand,
  ReservaActividad,
  CreateReservaActividadCommand,
  UpdateReservaActividadCommand,
  Reserva,
  CreateReservaCommand,
  UpdateReservaCommand,
} from '../types';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:5141/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = authService.getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = authService.getStoredRefreshToken();

      if (!refreshToken) {
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        await authService.refresh(refreshToken);
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Actividades Recreativas
export const actividadesRecreativasService = {
  getAll: () => api.get<ActividadRecreativa[]>('/ActividadesRecreativas'),
  getById: (id: number) => api.get<ActividadRecreativa>(`/ActividadesRecreativas/${id}`),
  create: (data: CreateActividadRecreativaCommand) => api.post<ActividadRecreativa>('/ActividadesRecreativas', data),
  update: (id: number, data: UpdateActividadRecreativaCommand) => api.put<ActividadRecreativa>(`/ActividadesRecreativas/${id}`, data),
  delete: (id: number) => api.delete(`/ActividadesRecreativas/${id}`),
};

// Reservas Actividades
export const reservasActividadesService = {
  getAll: () => api.get<ReservaActividad[]>('/ReservasActividades'),
  getById: (id: number) => api.get<ReservaActividad>(`/ReservasActividades/${id}`),
  create: (data: CreateReservaActividadCommand) => api.post<ReservaActividad>('/ReservasActividades', data),
  update: (id: number, data: UpdateReservaActividadCommand) => api.put<ReservaActividad>(`/ReservasActividades/${id}`, data),
  delete: (id: number) => api.delete(`/ReservasActividades/${id}`),
};

// Reservas
export const reservasService = {
  getAll: () => api.get<Reserva[]>('/Reservas'),
  getById: (id: number) => api.get<Reserva>(`/Reservas/${id}`),
  getByHuesped: (huespedId: number) => api.get<Reserva[]>(`/Reservas/huesped/${huespedId}`),
  create: (data: CreateReservaCommand) => api.post<Reserva>('/Reservas', data),
  update: (id: number, data: UpdateReservaCommand) => api.put<Reserva>(`/Reservas/${id}`, data),
  delete: (id: number) => api.delete(`/Reservas/${id}`),
};

export default api;
