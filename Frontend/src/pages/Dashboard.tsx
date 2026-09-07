import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ¡Bienvenido, {user?.name || 'Usuario'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Panel de control de FlowBoard Collab
            </p>
          </div>
          <Link
            to="/boards"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ver tableros
          </Link>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900">{user?.name}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Correo</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900">{user?.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Miembro desde</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/boards/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📋</div>
              <span className="text-sm font-medium text-gray-700">Crear tablero</span>
            </Link>
            <Link
              to="/boards"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium text-gray-700">Ver tableros</span>
            </Link>
            <Link
              to="/profile"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">👤</div>
              <span className="text-sm font-medium text-gray-700">Mi perfil</span>
            </Link>
          </div>
        </div>

        {/* Placeholder para futuros componentes */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Actividad reciente</h3>
            <p className="text-gray-500 text-sm">
              Aquí aparecerán tus actividades recientes...
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📌 Tus tableros</h3>
            <p className="text-gray-500 text-sm">
              No tienes tableros aún. ¡Crea uno!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;