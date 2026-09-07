import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '../types/types.ts';

// ============================================
// CONFIGURACIÓN DE LA API
// ============================================
// La URL DEBE configurarse en el archivo .env
// Variable requerida: VITE_API_URL
// Ejemplo: VITE_API_URL=http://localhost:5000/api
// ============================================
const API_URL = import.meta.env.VITE_API_URL;

// Validar que la URL esté configurada
if (!API_URL) {
  throw new Error(
    '❌ VITE_API_URL no está definida en el archivo .env\n' +
    'Por favor, crea un archivo .env con:\n' +
    'VITE_API_URL=http://localhost:5000/api'
  );
}

// ---------- CREAR INSTANCIA ----------
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// ---------- INTERCEPTOR DE REQUEST ----------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---------- INTERCEPTOR DE RESPONSE ----------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Error de autenticación (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    // Error de validación (422)
    if (error.response?.status === 422) {
      const message = error.response.data?.message || 'Error de validación';
      console.error('Validation Error:', error.response.data?.errors);
      return Promise.reject({
        ...error,
        message,
        errors: error.response.data?.errors,
      });
    }
    
    // Error de servidor (500)
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;