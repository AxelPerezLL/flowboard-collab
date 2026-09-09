import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Por favor completa todos los campos');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      {/* <====[FONDO]=====> */}
      <div className="login-background">
        <div className="login-orb-1" />
        <div className="login-orb-2" />
        <div className="login-orb-3" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="login-particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#00d4ff' : '#4a6b9a',
              opacity: Math.random() * 0.5 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* <====[CARD]=====> */}
      <div className="login-card">
        <div className="login-card-inner">
          {/* <====[LOGO]=====> */}
          <div className="login-logo-wrapper">
            <div className="login-logo">
              <span className="login-logo-text">F</span>
              <div className="login-logo-glow" />
            </div>
            <h1 className="login-title">FlowBoard Collab</h1>
            <p className="login-subtitle">Inicia sesión para continuar</p>
          </div>

          {/* <====[FORMULARIO]=====> */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* <====[CAMPO EMAIL]=====> */}
            <div className="login-field">
              <label 
                htmlFor="email" 
                className={`login-label ${isFocused.email || email ? 'login-label--focused' : ''}`}
              >
                Correo electrónico
              </label>
              <div className="login-input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  className="login-input"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
                <div className={`login-input-underline ${isFocused.email || email ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[CAMPO PASSWORD]=====> */}
            <div className="login-field">
              <label 
                htmlFor="password" 
                className={`login-label ${isFocused.password || password ? 'login-label--focused' : ''}`}
              >
                Contraseña
              </label>
              <div className="login-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  className="login-input"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
                <div className={`login-input-underline ${isFocused.password || password ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[ERROR]=====> */}
            {(error || localError) && (
              <div className="login-error">
                <p className="login-error-text">{localError || error}</p>
              </div>
            )}

            {/* <====[BOTÓN]=====> */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
            >
              <span className="login-submit-btn-glow" />
              <span className="login-submit-btn-glow-blur" />
              
              {isLoading ? (
                <span className="login-submit-btn-loading">
                  <svg className="login-submit-btn-spinner" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <p className="login-register-link">
              ¿No tienes cuenta?{' '}
              <Link to="/register">Regístrate</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;