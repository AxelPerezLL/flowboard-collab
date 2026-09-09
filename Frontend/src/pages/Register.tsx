import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({ name: false, email: false, password: false, passwordConfirm: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!name || !email || !password || !passwordConfirm) {
      setLocalError('Por favor completa todos los campos');
      return;
    }

    if (password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== passwordConfirm) {
      setLocalError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  return (
    <div className="register-container">
      {/* <====[FONDO]=====> */}
      <div className="register-background">
        <div className="register-orb-1" />
        <div className="register-orb-2" />
        <div className="register-orb-3" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="register-particle"
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
      <div className="register-card">
        <div className="register-card-inner">
          {/* <====[LOGO]=====> */}
          <div className="register-logo-wrapper">
            <div className="register-logo">
              <span className="register-logo-text">F</span>
              <div className="register-logo-glow" />
            </div>
            <h1 className="register-title">FlowBoard Collab</h1>
            <p className="register-subtitle">Crea tu cuenta para comenzar</p>
          </div>

          {/* <====[FORMULARIO]=====> */}
          <form onSubmit={handleSubmit} className="register-form">
            {/* <====[NOMBRE]=====> */}
            <div className="register-field">
              <label 
                htmlFor="name" 
                className={`register-label ${isFocused.name || name ? 'register-label--focused' : ''}`}
              >
                Nombre completo
              </label>
              <div className="register-input-wrapper">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => setIsFocused({ ...isFocused, name: false })}
                  className="register-input"
                  placeholder="Tu nombre"
                  disabled={isLoading}
                  autoComplete="name"
                />
                <div className={`register-input-underline ${isFocused.name || name ? 'register-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[EMAIL]=====> */}
            <div className="register-field register-field--delay-2">
              <label 
                htmlFor="email" 
                className={`register-label ${isFocused.email || email ? 'register-label--focused' : ''}`}
              >
                Correo electrónico
              </label>
              <div className="register-input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  className="register-input"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
                <div className={`register-input-underline ${isFocused.email || email ? 'register-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[PASSWORD]=====> */}
            <div className="register-field register-field--delay-3">
              <label 
                htmlFor="password" 
                className={`register-label ${isFocused.password || password ? 'register-label--focused' : ''}`}
              >
                Contraseña
              </label>
              <div className="register-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  className="register-input"
                  placeholder="Mínimo 6 caracteres"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="register-password-toggle"
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
                <div className={`register-input-underline ${isFocused.password || password ? 'register-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[CONFIRMAR PASSWORD]=====> */}
            <div className="register-field register-field--delay-3">
              <label 
                htmlFor="passwordConfirm" 
                className={`register-label ${isFocused.passwordConfirm || passwordConfirm ? 'register-label--focused' : ''}`}
              >
                Confirmar contraseña
              </label>
              <div className="register-input-wrapper">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, passwordConfirm: true })}
                  onBlur={() => setIsFocused({ ...isFocused, passwordConfirm: false })}
                  className="register-input"
                  placeholder="Repite tu contraseña"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="register-password-toggle"
                  tabIndex={-1}
                >
                  {showPasswordConfirm ? (
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
                <div className={`register-input-underline ${isFocused.passwordConfirm || passwordConfirm ? 'register-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* <====[ERROR]=====> */}
            {(error || localError) && (
              <div className="register-error">
                <p className="register-error-text">{localError || error}</p>
              </div>
            )}

            {/* <====[BOTÓN]=====> */}
            <button
              type="submit"
              disabled={isLoading}
              className="register-submit-btn"
            >
              <span className="register-submit-btn-glow" />
              <span className="register-submit-btn-glow-blur" />
              
              {isLoading ? (
                <span className="register-submit-btn-loading">
                  <svg className="register-submit-btn-spinner" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                'Crear cuenta'
              )}
            </button>

            <p className="register-login-link">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;