import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api/auth';
import '../styles/pages/login.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate(); // <-- NUEVO
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });
      // <====[NAVEGAR AL PASO 2 CON EL EMAIL]=====>
      navigate('/verify-code', { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al enviar el correo. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
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

      <div className="login-card">
        <div className="login-card-inner">
          <div className="login-logo-wrapper">
            <div className="login-logo">
              <span className="login-logo-text">F</span>
              <div className="login-logo-glow" />
            </div>
            <h1 className="login-title">Recuperar Contraseña</h1>
            <p className="login-subtitle">Ingresa tu correo y te enviaremos un código</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label 
                htmlFor="email" 
                className={`login-label ${isFocused || email ? 'login-label--focused' : ''}`}
              >
                Correo electrónico
              </label>
              <div className="login-input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="login-input"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
                <div className={`login-input-underline ${isFocused || email ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="login-error">
                <p className="login-error-text">{error}</p>
              </div>
            )}

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
                  Enviando...
                </span>
              ) : (
                'Enviar código'
              )}
            </button>

            <p className="login-register-link">
              <Link to="/login">← Volver al inicio de sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;