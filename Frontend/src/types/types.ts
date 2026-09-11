// ============================================
// TYPES - FlowBoard Collab
// ============================================

// ---------- AUTH ----------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string; // Para validación frontend
}

export interface AuthResponse {
  userId: number;
  name: string;
  email: string;
  token: string;
  expiresAt: string; // ISO date string
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string; // ISO date string
}

// ---------- API RESPONSES ----------
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// ---------- PASSWORD RESET ----------
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  recoveryCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// ---------- VERIFY CODE ----------
export interface VerifyCodeRequest {
  email: string;
  recoveryCode: string;
}

export interface VerifyCodeResponse {
  valid: boolean;
  message: string;
}

// ---------- CONTEXT STATE ----------
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ---------- PAGINACIÓN (para futuro) ----------
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// ---------- BOARD (para futuro) ----------
export interface Board {
  id: number;
  name: string;
  description: string | null;
  teamId: number | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- COLUMN (para futuro) ----------
export interface Column {
  id: number;
  name: string;
  boardId: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- CARD (para futuro) ----------
export interface Card {
  id: number;
  title: string;
  description: string | null;
  columnId: number;
  position: number;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedUserId: number | null;
  createdAt: string;
  updatedAt: string;
}