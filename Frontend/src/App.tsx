import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Layout } from './components/layout/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword'; 
import VerifyCode from './pages/VerifyCode';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <====[RUTAS PÚBLICAS]=====> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/verify-code" element={<VerifyCode />} />  
          <Route path="/reset-password" element={<ResetPassword />} /> 
          
          {/* <====[REDIRECCIÓN]=====> */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* <====[RUTAS PROTEGIDAS CON LAYOUT]=====> */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/boards" element={<div className="text-text-primary">Página de tableros (próximamente)</div>} />
              <Route path="/boards/:id" element={<div className="text-text-primary">Detalle del tablero (próximamente)</div>} />
              <Route path="/stats" element={<div className="text-text-primary">Estadísticas (próximamente)</div>} />
              <Route path="/profile" element={<div className="text-text-primary">Perfil (próximamente)</div>} />
            </Route>
          </Route>
          
          {/* <====[404]=====> */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;