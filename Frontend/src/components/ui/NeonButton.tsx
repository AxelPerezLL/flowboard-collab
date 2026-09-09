import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  glowColor?: 'cyan' | 'blue' | 'error';
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  isLoading = false,
  glowColor = 'cyan',
}) => {
  const variantClasses = {
    primary: 'bg-cyan-dark hover:bg-cyan-medium text-white',
    secondary: 'bg-blue-muted hover:bg-blue-muted-light text-white',
    outline: 'border border-cyan-dark text-cyan-light hover:bg-cyan-dark hover:text-white',
    danger: 'bg-error hover:bg-red-600 text-white',
  };

  const glowClasses = {
    cyan: 'hover:glow-cyan',
    blue: 'hover:glow-blue',
    error: 'hover:glow-error',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        btn-glow relative font-medium py-2 px-4 rounded-lg transition-all duration-300
        ${variantClasses[variant]}
        ${glowClasses[glowColor]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-dark to-cyan-medium opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};