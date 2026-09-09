import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  orbCount?: number;
  showParticles?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  orbCount = 3,
  showParticles = true,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* <====[ORBES DECORATIVOS]=====> */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <====[ORBE 1]=====> */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full orb-cyan animate-float"
        />
        
        {/* <====[ORBE 2]=====> */}
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full orb-blue animate-float-delay"
        />
        
        {/* <====[ORBE 3]=====> */}
        <div 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-dark/10 blur-3xl animate-pulse-slow"
        />

        {/* <====[PARTÍCULAS]=====> */}
        {showParticles && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="particle"
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
          </>
        )}
      </div>

      {/* <====[CONTENIDO]=====> */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};