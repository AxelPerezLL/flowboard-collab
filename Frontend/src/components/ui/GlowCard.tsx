import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'none';
  hoverGlow?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  hoverGlow = true,
}) => {
  const glowClasses = {
    cyan: 'border-glow-cyan hover:border-glow-cyan',
    blue: 'border-glow-blue hover:border-glow-blue',
    none: '',
  };

  const hoverClasses = hoverGlow ? 'card-glow' : '';

  return (
    <div className={`card-dark ${hoverClasses} ${glowClasses[glowColor]} ${className}`}>
      {children}
    </div>
  );
};