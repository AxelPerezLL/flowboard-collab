import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';

export const AnimatedOutlet: React.FC = () => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-fade-in-up"
    >
      <Outlet />
    </div>
  );
};