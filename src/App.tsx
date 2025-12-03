import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ActividadesRecreativas } from './pages/ActividadesRecreativas';
import { ReservasActividades } from './pages/ReservasActividades';
import { Reservas } from './pages/Reservas';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ActividadesRecreativas />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas-actividades"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ReservasActividades />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Reservas />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
