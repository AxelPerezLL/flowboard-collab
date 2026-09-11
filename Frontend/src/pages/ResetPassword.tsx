import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import '../styles/pages/login.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; recoveryCode?: string } | null;

  const email = state?.email || '';
  const recoveryCode = state?.recoveryCode || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({ pass: false, confirm: false });

  // <====[PROTECCIÓN: si no vienen email y código, regresar al paso 1]=====>
  useEffect(() => {
    if (!email || !recoveryCode) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, recoveryCode, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ email, recoveryCode, newPassword, confirmPassword });
      // Éxito → volver al login con mensaje
      navigate('/login', {
        state: { message: 'Contraseña restablecida exitosamente. Inicia sesión.' },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido o expirado.');
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
            <h1 className="login-title">Nueva Contraseña</h1>
            <p className="login-subtitle">Elige una contraseña segura para tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Nueva Contraseña */}
            <div className="login-field">
              <label
                htmlFor="newPassword"
                className={`login-label ${isFocused.pass || newPassword ? 'login-label--focused' : ''}`}
              >
                Nueva Contraseña
              </label>
              <div className="login-input-wrapper">
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, pass: true })}
                  onBlur={() => setIsFocused({ ...isFocused, pass: false })}
                  className="login-input"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                  autoFocus
                />
                <div className={`login-input-underline ${isFocused.pass || newPassword ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="login-field">
              <label
                htmlFor="confirmPassword"
                className={`login-label ${isFocused.confirm || confirmPassword ? 'login-label--focused' : ''}`}
              >
                Confirmar Contraseña
              </label>
              <div className="login-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, confirm: true })}
                  onBlur={() => setIsFocused({ ...isFocused, confirm: false })}
                  className="login-input"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <div className={`login-input-underline ${isFocused.confirm || confirmPassword ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {/* Checkbox mostrar contraseñas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <input
                type="checkbox"
                id="showPass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ accentColor: '#00d4ff', cursor: 'pointer' }}
              />
              <label
                htmlFor="showPass"
                style={{ color: '#8b949e', fontSize: '14px', cursor: 'pointer', userSelect: 'none' }}
              >
                Mostrar contraseñas
              </label>
            </div>

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
                  Restableciendo...
                </span>
              ) : (
                'Restablecer Contraseña'
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

export default ResetPassword;