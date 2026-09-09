import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* <====[HEADER]=====> */}
      <div className="dashboard-header animate-fade-in-up">
        <div>
          <h1 className="dashboard-title">
            ¡Bienvenido, {user?.name || 'Usuario'}! 👋
          </h1>
          <p className="dashboard-subtitle">
            Este es tu panel de control de FlowBoard Collab
          </p>
        </div>
        <Link to="/boards" className="dashboard-new-board-btn">
          <span className="dashboard-new-board-btn-glow" />
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo tablero
        </Link>
      </div>

      {/* <====[STATS - VACIOS]=====> */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="dashboard-stat-content">
            <span className="dashboard-stat-icon">📋</span>
            <div>
              <p className="dashboard-stat-value">0</p>
              <p className="dashboard-stat-label">Tableros</p>
            </div>
          </div>
        </div>
        <div className="dashboard-stat-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="dashboard-stat-content">
            <span className="dashboard-stat-icon">📝</span>
            <div>
              <p className="dashboard-stat-value">0</p>
              <p className="dashboard-stat-label">Tarjetas</p>
            </div>
          </div>
        </div>
        <div className="dashboard-stat-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="dashboard-stat-content">
            <span className="dashboard-stat-icon">👥</span>
            <div>
              <p className="dashboard-stat-value">0</p>
              <p className="dashboard-stat-label">Miembros</p>
            </div>
          </div>
        </div>
        <div className="dashboard-stat-card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="dashboard-stat-content">
            <span className="dashboard-stat-icon">✅</span>
            <div>
              <p className="dashboard-stat-value">0</p>
              <p className="dashboard-stat-label">Completadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* <====[ACTIVIDAD Y ACCIONES - VACIAS]=====> */}
      <div className="dashboard-activity">
        <div className="dashboard-activity-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="dashboard-activity-title">📈 Actividad reciente</h3>
          <div className="text-text-secondary text-sm">
            No hay actividad reciente
          </div>
        </div>

        <div className="dashboard-activity-card animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="dashboard-activity-title">📌 Acciones rápidas</h3>
          <div className="dashboard-actions">
            <Link
              to="/boards"
              className="dashboard-action-btn animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              <div className="dashboard-action-icon">📊</div>
              <span className="dashboard-action-label">Ver tableros</span>
            </Link>
            <Link
              to="/profile"
              className="dashboard-action-btn animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="dashboard-action-icon">👤</div>
              <span className="dashboard-action-label">Mi perfil</span>
            </Link>
            <Link
              to="/stats"
              className="dashboard-action-btn animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
            >
              <div className="dashboard-action-icon">📈</div>
              <span className="dashboard-action-label">Estadísticas</span>
            </Link>
            <div className="dashboard-action-btn animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="dashboard-action-icon">❓</div>
              <span className="dashboard-action-label">Ayuda</span>
            </div>
          </div>
        </div>
      </div>

      {/* <====[PERFIL]=====> */}
      <div className="dashboard-profile animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <h3 className="dashboard-profile-title">🧑‍💻 Mi perfil</h3>
        <div className="dashboard-profile-grid">
          <div>
            <p className="dashboard-profile-label">Nombre</p>
            <p className="dashboard-profile-value">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="dashboard-profile-label">Correo</p>
            <p className="dashboard-profile-value">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="dashboard-profile-label">Miembro desde</p>
            <p className="dashboard-profile-value">
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;