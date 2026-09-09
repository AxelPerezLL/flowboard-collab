import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/* <====[ICONOS SVG]=====> */
const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  boards: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  stats: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  profile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  logout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

/* <====[NAVEGACIÓN]=====> */
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: icons.dashboard },
  { path: '/boards', label: 'Tableros', icon: icons.boards },
  { path: '/stats', label: 'Estadísticas', icon: icons.stats },
  { path: '/profile', label: 'Perfil', icon: icons.profile },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* <====[OVERLAY PARA MÓVIL]=====> */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* <====[SIDEBAR]=====> */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-bg-secondary/95 backdrop-blur-sm border-r border-border z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        {/* <====[HEADER SIDEBAR]=====> */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-dark to-cyan-medium flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.2)]">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary">FlowBoard</h1>
            <p className="text-xs text-text-secondary">Collab</p>
          </div>
        </div>

        {/* <====[NAVEGACIÓN]=====> */}
        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link relative overflow-hidden transition-all duration-300 ${
                  isActive ? 'sidebar-link-active' : ''
                }`
              }
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {/* <====[ANIMACIÓN DE GLOW AL HOVER]=====> */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-dark/10 to-cyan-light/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* <====[INDICADOR ACTIVO]=====> */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-light rounded-r-full" />
                  )}
                  
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* <====[ANIMACIÓN DE SUBRAYADO]=====> */}
                  <span className={`absolute bottom-2 left-4 right-4 h-0.5 bg-cyan-light/30 transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                  }`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* <====[PERFIL Y LOGOUT]=====> */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-bg-tertiary/50 backdrop-blur-sm transition-all duration-300 hover:bg-bg-tertiary">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-muted to-cyan-dark flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(74,107,154,0.2)]">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate hover:text-cyan-light transition-colors duration-300">
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user?.email || 'email@ejemplo.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-all duration-300 hover:scale-110"
              title="Cerrar sesión"
            >
              {icons.logout}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};