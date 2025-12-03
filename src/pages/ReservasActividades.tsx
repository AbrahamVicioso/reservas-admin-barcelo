import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Users, DollarSign } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Badge } from '../components/Badge';
import { Table } from '../components/Table';
import { reservasActividadesService } from '../services/api';
import type { ReservaActividad, CreateReservaActividadCommand, UpdateReservaActividadCommand } from '../types';

export const ReservasActividades: React.FC = () => {
  const [reservas, setReservas] = useState<ReservaActividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<ReservaActividad | null>(null);
  const [formData, setFormData] = useState<Partial<CreateReservaActividadCommand>>({
    actividadId: 0,
    huespedId: 0,
    fechaReserva: '',
    horaReserva: '',
    numeroPersonas: 1,
    montoTotal: 0,
    notasEspeciales: '',
  });

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      setLoading(true);
      const response = await reservasActividadesService.getAll();
      setReservas(response.data);
    } catch (error) {
      console.error('Error loading reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (reserva?: ReservaActividad) => {
    if (reserva) {
      setEditingReserva(reserva);
      setFormData({
        actividadId: reserva.actividadId,
        huespedId: reserva.huespedId,
        fechaReserva: reserva.fechaReserva.split('T')[0],
        horaReserva: reserva.horaReserva,
        numeroPersonas: reserva.numeroPersonas,
        montoTotal: reserva.montoTotal,
        notasEspeciales: reserva.notasEspeciales,
      });
    } else {
      setEditingReserva(null);
      setFormData({
        actividadId: 0,
        huespedId: 0,
        fechaReserva: new Date().toISOString().split('T')[0],
        horaReserva: '09:00:00',
        numeroPersonas: 1,
        montoTotal: 0,
        notasEspeciales: '',
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingReserva(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReserva) {
        const updateData: UpdateReservaActividadCommand = {
          reservaActividadId: editingReserva.reservaActividadId,
          fechaReserva: formData.fechaReserva!,
          horaReserva: formData.horaReserva!,
          numeroPersonas: formData.numeroPersonas!,
          estado: editingReserva.estado,
          montoTotal: formData.montoTotal!,
          notasEspeciales: formData.notasEspeciales,
          recordatorioEnviado: editingReserva.recordatorioEnviado,
          fechaRecordatorio: editingReserva.fechaRecordatorio,
        };
        await reservasActividadesService.update(editingReserva.reservaActividadId, updateData);
      } else {
        await reservasActividadesService.create(formData as CreateReservaActividadCommand);
      }
      handleCloseModal();
      loadReservas();
    } catch (error) {
      console.error('Error saving reserva:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      try {
        await reservasActividadesService.delete(id);
        loadReservas();
      } catch (error) {
        console.error('Error deleting reserva:', error);
      }
    }
  };

  const getEstadoBadge = (estado: string) => {
    const estados: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info'; label: string }> = {
      Confirmada: { variant: 'success', label: 'Confirmada' },
      Pendiente: { variant: 'warning', label: 'Pendiente' },
      Cancelada: { variant: 'danger', label: 'Cancelada' },
      Completada: { variant: 'info', label: 'Completada' },
    };
    const estadoInfo = estados[estado] || { variant: 'default' as const, label: estado };
    return <Badge variant={estadoInfo.variant}>{estadoInfo.label}</Badge>;
  };

  const columns = [
    {
      key: 'reservaActividadId',
      label: 'ID',
      render: (item: ReservaActividad) => (
        <span className="font-mono text-sm">#{item.reservaActividadId}</span>
      ),
    },
    {
      key: 'actividadId',
      label: 'Actividad',
      render: (item: ReservaActividad) => (
        <span className="text-gray-900">Actividad #{item.actividadId}</span>
      ),
    },
    {
      key: 'huespedId',
      label: 'Huésped',
      render: (item: ReservaActividad) => (
        <span className="text-gray-900">Huésped #{item.huespedId}</span>
      ),
    },
    {
      key: 'fechaReserva',
      label: 'Fecha y Hora',
      render: (item: ReservaActividad) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-4 h-4" />
          <div>
            <p>{new Date(item.fechaReserva).toLocaleDateString('es-DO')}</p>
            <p className="text-xs text-gray-500">{item.horaReserva}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'numeroPersonas',
      label: 'Personas',
      render: (item: ReservaActividad) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Users className="w-4 h-4" />
          <span>{item.numeroPersonas}</span>
        </div>
      ),
    },
    {
      key: 'montoTotal',
      label: 'Monto',
      render: (item: ReservaActividad) => (
        <div className="flex items-center gap-1 text-gray-900 font-medium">
          <DollarSign className="w-4 h-4" />
          <span>${item.montoTotal.toFixed(2)}</span>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (item: ReservaActividad) => getEstadoBadge(item.estado),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item: ReservaActividad) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.reservaActividadId)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
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
    <div className="space-y-6">
      <Card
        title="Reservas de Actividades"
        subtitle="Gestiona las reservas de actividades recreativas"
        action={
          <Button onClick={() => handleOpenModal()}>
            <Plus className="w-4 h-4" />
            Nueva Reserva
          </Button>
        }
      >
        <Table data={reservas} columns={columns} />
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingReserva ? 'Editar Reserva' : 'Nueva Reserva'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ID de Actividad"
              type="number"
              value={formData.actividadId}
              onChange={(e) => setFormData({ ...formData, actividadId: parseInt(e.target.value) })}
              required
            />

            <Input
              label="ID de Huésped"
              type="number"
              value={formData.huespedId}
              onChange={(e) => setFormData({ ...formData, huespedId: parseInt(e.target.value) })}
              required
            />

            <Input
              label="Fecha de Reserva"
              type="date"
              value={formData.fechaReserva}
              onChange={(e) => setFormData({ ...formData, fechaReserva: e.target.value })}
              required
            />

            <Input
              label="Hora de Reserva"
              type="time"
              value={formData.horaReserva}
              onChange={(e) => setFormData({ ...formData, horaReserva: e.target.value + ':00' })}
              required
            />

            <Input
              label="Número de Personas"
              type="number"
              value={formData.numeroPersonas}
              onChange={(e) => setFormData({ ...formData, numeroPersonas: parseInt(e.target.value) })}
              required
            />

            <Input
              label="Monto Total"
              type="number"
              step="0.01"
              value={formData.montoTotal}
              onChange={(e) => setFormData({ ...formData, montoTotal: parseFloat(e.target.value) })}
              required
            />
          </div>

          <Textarea
            label="Notas Especiales"
            value={formData.notasEspeciales}
            onChange={(e) => setFormData({ ...formData, notasEspeciales: e.target.value })}
            placeholder="Alguna nota especial sobre la reserva..."
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingReserva ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
