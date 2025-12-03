import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await register({ email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Error al registrar. El correo puede estar en uso o la contraseña no cumple los requisitos.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-800 mb-2 tracking-tight">Crear cuenta</h1>
          <p className="text-gray-500 font-light">Regístrate para acceder al sistema</p>
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
              autoComplete="new-password"
            />

            <Input
              type="password"
              label="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="new-password"
            />

            {error && (
              <div className="p-4 bg-danger/5 border border-danger/20 rounded-md">
                <p className="text-sm text-danger font-light">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-success/5 border border-success/20 rounded-md">
                <p className="text-sm text-success font-light">
                  ¡Registro exitoso! Redirigiendo al inicio de sesión...
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Registrarse
            </Button>

            <div className="text-center text-sm text-gray-500 font-light pt-2">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-normal">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
