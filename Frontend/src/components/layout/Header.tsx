import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-bg-secondary/80 backdrop-blur-md border-b border-border px-4 py-3 lg:px-8 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* <====[BOTÓN MENÚ MÓVIL]=====> */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* <====[BUSCADOR]=====> */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center transition-colors duration-300 ${
            isSearchFocused ? 'text-cyan-light' : 'text-text-muted'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full pl-10 pr-4 py-2 bg-bg-tertiary border rounded-lg text-text-primary placeholder-text-muted transition-all duration-300 ${
              isSearchFocused 
                ? 'border-cyan-dark shadow-[0_0_20px_rgba(0,212,255,0.1)]' 
                : 'border-border'
            }`}
          />
        </div>

        {/* <====[ACCIONES]=====> */}
        <div className="flex items-center gap-2">
          {/* <====[BOTÓN NOTIFICACIONES]=====> */}
          <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 hover:scale-105 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* <====[PUNTO DE NOTIFICACIÓN]=====> */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse-glow" />
          </button>

          {/* <====[BOTÓN TEMA]=====> */}
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-300 hover:scale-105 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};