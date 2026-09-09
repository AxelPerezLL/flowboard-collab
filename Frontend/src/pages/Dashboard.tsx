import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Tableros', value: '3', icon: '📋' },
    { label: 'Tarjetas', value: '12', icon: '📝' },
    { label: 'Miembros', value: '5', icon: '👥' },
    { label: 'Completadas', value: '8', icon: '✅' },
  ];

  const activities = [
    { text: 'Creaste el tablero "Proyecto Alpha"', time: 'Hace 2 horas', dot: 'cyan' },
    { text: 'Completaste la tarea "Diseñar UI"', time: 'Hace 5 horas', dot: 'blue' },
    { text: 'Te uniste al equipo "Desarrollo"', time: 'Ayer', dot: 'success' },
  ];

  const actions = [
    { path: '/boards', icon: '📊', label: 'Ver tableros' },
    { path: '/profile', icon: '👤', label: 'Mi perfil' },
    { path: '/stats', icon: '📈', label: 'Estadísticas' },
    { path: '#', icon: '❓', label: 'Ayuda' },
  ];

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

      {/* <====[STATS]=====> */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="dashboard-stat-card animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="dashboard-stat-content">
              <span className="dashboard-stat-icon">{stat.icon}</span>
              <div>
                <p className="dashboard-stat-value">{stat.value}</p>
                <p className="dashboard-stat-label">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <====[ACTIVIDAD RECIENTE]=====> */}
      <div className="dashboard-activity">
        <div className="dashboard-activity-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="dashboard-activity-title">📈 Actividad reciente</h3>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="dashboard-activity-item animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className={`dashboard-activity-dot-${activity.dot}`} />
                <div>
                  <p className="dashboard-activity-text">{activity.text}</p>
                  <p className="dashboard-activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity-card animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="dashboard-activity-title">📌 Acciones rápidas</h3>
          <div className="dashboard-actions">
            {actions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="dashboard-action-btn animate-fade-in-up"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="dashboard-action-icon">{action.icon}</div>
                <span className="dashboard-action-label">{action.label}</span>
              </Link>
            ))}
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