import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyCode } from '../api/auth'; // <-- NUEVO
import '../styles/pages/login.css';

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string })?.email || '';

  const [email, setEmail] = useState(emailFromState);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({ email: false, code: false });

  // Protección: si no hay email, redirigir al paso 1
  useEffect(() => {
    if (!emailFromState) {
      navigate('/forgot-password', { replace: true });
    }
  }, [emailFromState, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!recoveryCode) {
      setError('Por favor ingresa el código');
      return;
    }
    if (recoveryCode.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setIsLoading(true);
    try {
      // <====[VALIDAR CÓDIGO CON EL BACKEND]=====>
      await verifyCode({ email, recoveryCode });
      
      // Si el backend lo valida, pasamos al paso 3
      navigate('/reset-password', { state: { email, recoveryCode } });
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
            <h1 className="login-title">Verificar Código</h1>
            <p className="login-subtitle">
              Ingresa el código de 6 dígitos que enviamos a{' '}
              <strong style={{ color: '#00d4ff' }}>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label 
                htmlFor="code"
                className={`login-label ${isFocused.code || recoveryCode ? 'login-label--focused' : ''}`}
              >
                Código de verificación
              </label>
              <div className="login-input-wrapper">
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onFocus={() => setIsFocused({ ...isFocused, code: true })}
                  onBlur={() => setIsFocused({ ...isFocused, code: false })}
                  className="login-input"
                  placeholder="000000"
                  maxLength={6}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                  autoFocus
                  style={{ 
                    textAlign: 'center', 
                    fontSize: '28px', 
                    letterSpacing: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                  }}
                />
                <div className={`login-input-underline ${isFocused.code || recoveryCode ? 'login-input-underline--active' : ''}`} />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <p className="login-error-text">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || recoveryCode.length !== 6}
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
                  Verificando...
                </span>
              ) : (
                'Verificar código'
              )}
            </button>

            <p className="login-register-link">
              <Link to="/forgot-password">← Volver a ingresar el correo</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;