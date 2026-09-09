import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header.tsx';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* <====[SIDEBAR]=====> */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* <====[CONTENIDO PRINCIPAL]=====> */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};