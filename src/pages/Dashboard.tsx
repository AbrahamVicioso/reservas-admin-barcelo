import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Calendar, CalendarCheck, Hotel, TrendingUp } from 'lucide-react';
import { actividadesRecreativasService, reservasActividadesService, reservasService } from '../services/api';

interface Stats {
  totalActividades: number;
  totalReservasActividades: number;
  totalReservasHabitaciones: number;
  ingresosEstimados: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalActividades: 0,
    totalReservasActividades: 0,
    totalReservasHabitaciones: 0,
    ingresosEstimados: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [actividades, reservasAct, reservas] = await Promise.all([
        actividadesRecreativasService.getAll(),
        reservasActividadesService.getAll(),
        reservasService.getAll(),
      ]);

      const ingresosActividades = reservasAct.data.reduce((sum, r) => sum + r.montoTotal, 0);
      const ingresosHabitaciones = reservas.data.reduce((sum, r) => sum + r.montoTotal, 0);

      setStats({
        totalActividades: actividades.data.length,
        totalReservasActividades: reservasAct.data.length,
        totalReservasHabitaciones: reservas.data.length,
        ingresosEstimados: ingresosActividades + ingresosHabitaciones,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Actividades Recreativas',
      value: stats.totalActividades,
      icon: Calendar,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Reservas de Actividades',
      value: stats.totalReservasActividades,
      icon: CalendarCheck,
      color: 'text-success',
      bgColor: 'bg-success-light/20',
    },
    {
      title: 'Reservas de Habitaciones',
      value: stats.totalReservasHabitaciones,
      icon: Hotel,
      color: 'text-primary-700',
      bgColor: 'bg-primary-100/50',
    },
    {
      title: 'Ingresos Estimados',
      value: `$${stats.ingresosEstimados.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: 'text-success-dark',
      bgColor: 'bg-success-light/30',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-text-primary tracking-tight">Bienvenido al Panel de Administración</h1>
        <p className="text-text-descriptive mt-2 font-light">Gestiona reservas y actividades del hotel Barceló</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-soft-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-weak mb-2 uppercase tracking-wide font-light">{stat.title}</p>
                  <p className="text-3xl font-light text-text-primary">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-sm`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.5} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Resumen del Sistema" className="hover:shadow-soft-md transition-all duration-200">
          <div className="space-y-1">
            <div className="flex items-center justify-between py-4 border-b border-border-card">
              <span className="text-text-descriptive font-light">Estado del sistema</span>
              <span className="px-3 py-1.5 bg-success/10 text-success rounded-sm text-xs font-normal">
                Operativo
              </span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border-card">
              <span className="text-text-descriptive font-light">API Backend</span>
              <span className="px-3 py-1.5 bg-success/10 text-success rounded-sm text-xs font-normal">
                Conectado
              </span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-text-descriptive font-light">Base de datos</span>
              <span className="px-3 py-1.5 bg-success/10 text-success rounded-sm text-xs font-normal">
                Sincronizada
              </span>
            </div>
          </div>
        </Card>

        <Card title="Accesos Rápidos" className="hover:shadow-soft-md transition-all duration-200">
          <div className="space-y-3">
            <button className="w-full text-left px-5 py-4 bg-primary-50/50 hover:bg-primary-50 rounded-sm transition-all duration-200 border border-primary-100/50 hover:border-primary-200">
              <p className="font-normal text-text-primary">Nueva Actividad</p>
              <p className="text-sm text-text-weak font-light mt-0.5">Crear una nueva actividad recreativa</p>
            </button>
            <button className="w-full text-left px-5 py-4 bg-success/5 hover:bg-success/10 rounded-sm transition-all duration-200 border border-success/20 hover:border-success/30">
              <p className="font-normal text-text-primary">Nueva Reserva</p>
              <p className="text-sm text-text-weak font-light mt-0.5">Registrar una nueva reserva de habitación</p>
            </button>
            <button className="w-full text-left px-5 py-4 bg-primary-100/30 hover:bg-primary-100/50 rounded-sm transition-all duration-200 border border-primary-200/50 hover:border-primary-300">
              <p className="font-normal text-text-primary">Reservar Actividad</p>
              <p className="text-sm text-text-weak font-light mt-0.5">Crear reserva para una actividad</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
