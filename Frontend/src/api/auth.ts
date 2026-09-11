import apiClient from './client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  ApiError,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyCodeRequest,
  VerifyCodeResponse
} from '../types/types.ts';

// ---------- LOGIN ----------
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    // Re-lanzar el error para que el componente lo maneje
    throw error;
  }
};

// ---------- REGISTER ----------
export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ---------- GET CURRENT USER ----------
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ---------- LOGOUT (solo cliente) ----------
export const logout = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};

// ---------- GUARDAR SESIÓN ----------
export const saveSession = (authResponse: AuthResponse): void => {
  localStorage.setItem('auth_token', authResponse.token);
  localStorage.setItem('auth_user', JSON.stringify({
    id: authResponse.userId,
    name: authResponse.name,
    email: authResponse.email,
  }));
};

// ---------- OBTENER TOKEN GUARDADO ----------
export const getStoredToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// ---------- OBTENER USUARIO GUARDADO ----------
export const getStoredUser = (): Partial<User> | null => {
  const userStr = localStorage.getItem('auth_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// ---------- FORGOT PASSWORD ----------
export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ---------- RESET PASSWORD ----------
export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (data: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
  try {
    const response = await apiClient.post<VerifyCodeResponse>('/auth/verify-code', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};