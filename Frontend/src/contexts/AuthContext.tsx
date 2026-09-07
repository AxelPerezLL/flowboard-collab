import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User, AuthState, LoginRequest, RegisterRequest } from '../types/types.ts';
import { 
  login as apiLogin, 
  register as apiRegister, 
  getCurrentUser,
  logout as apiLogout,
  saveSession,
  getStoredToken,
  getStoredUser,
} from '../api/auth';

// ---------- CONTEXT INTERFACE ----------
interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// ---------- INITIAL STATE ----------
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// ---------- CREATE CONTEXT ----------
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------- PROVIDER COMPONENT ----------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // ---------- REFRESH USER ----------
  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    
    if (!token) {
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      // Intentar obtener usuario del localStorage primero
      const storedUser = getStoredUser();
      
      // Si tenemos token pero no usuario, lo obtenemos de la API
      if (!storedUser) {
        const user = await getCurrentUser();
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Usar datos guardados, pero refrescar en background
      setState({
        user: storedUser as User,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Refrescar en background (no bloquear UI)
      getCurrentUser()
        .then((user) => {
          localStorage.setItem('auth_user', JSON.stringify(user));
          setState((prev) => ({
            ...prev,
            user,
          }));
        })
        .catch(() => {
          // Si falla, mantenemos los datos guardados
        });

    } catch (error) {
      console.error('Error refreshing user:', error);
      // Si hay error, limpiar sesión
      apiLogout();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Sesión expirada',
      });
    }
  }, []);

  // ---------- LOGIN ----------
  const login = useCallback(async (credentials: LoginRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiLogin(credentials);
      
      // Guardar sesión
      saveSession(response);
      
      // Obtener usuario completo
      const user = await getCurrentUser();
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setState({
        user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setState({
        ...initialState,
        isLoading: false,
        error: message,
      });
      throw error;
    }
  }, []);

  // ---------- REGISTER ----------
  const register = useCallback(async (userData: RegisterRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiRegister(userData);
      
      // Guardar sesión
      saveSession(response);
      
      // Obtener usuario completo
      const user = await getCurrentUser();
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setState({
        user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al registrarse';
      setState({
        ...initialState,
        isLoading: false,
        error: message,
      });
      throw error;
    }
  }, []);

  // ---------- LOGOUT ----------
  const logout = useCallback(() => {
    apiLogout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // ---------- EFECTO INICIAL ----------
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // ---------- VALUE ----------
  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};