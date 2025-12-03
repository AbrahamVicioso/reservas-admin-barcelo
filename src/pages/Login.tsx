import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-textColor-primary mb-2 tracking-tight">Reservas Admin Barceló</h1>
          <p className="text-textColor-secondary font-light">Inicia sesión para acceder al sistema</p>
        </div>

        <Card className="shadow-soft-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />

            <Input
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="p-4 bg-danger/5 border border-danger/20 rounded-md">
                <p className="text-sm text-danger font-light">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Iniciar sesión
            </Button>

            <div className="text-center space-y-3 pt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 block font-light"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <div className="text-sm text-textColor-secondary font-light">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-normal">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
