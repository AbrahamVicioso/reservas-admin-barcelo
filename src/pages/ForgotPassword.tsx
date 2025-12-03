import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import { ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await authService.forgotPassword({ email });
      setSuccess(true);
    } catch (err) {
      setError('Error al enviar el correo de recuperación. Verifica el email ingresado.');
      console.error('Forgot password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-800 mb-2 tracking-tight">Recuperar contraseña</h1>
          <p className="text-gray-500 font-light">
            Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña
          </p>
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

            {error && (
              <div className="p-4 bg-danger/5 border border-danger/20 rounded-md">
                <p className="text-sm text-danger font-light">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-success/5 border border-success/20 rounded-md">
                <p className="text-sm text-success font-light">
                  Se ha enviado un correo con instrucciones para restablecer tu contraseña.
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Enviar instrucciones
            </Button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-light pt-2"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Volver al inicio de sesión
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
};
