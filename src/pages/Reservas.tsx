import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Users, Home } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Badge } from '../components/Badge';
import { Table } from '../components/Table';
import { reservasService } from '../services/api';
import type { Reserva, CreateReservaCommand, UpdateReservaCommand } from '../types';

export const Reservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);
  const [formData, setFormData] = useState<Partial<CreateReservaCommand>>({
    huespedId: 0,
    habitacionId: 0,
    fechaCheckIn: '',
    fechaCheckOut: '',
    numeroHuespedes: 1,
    numeroNinos: 0,
    montoTotal: 0,
    montoPagado: 0,
    creadoPor: 'Admin',
    observaciones: '',
  });

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      setLoading(true);
      const response = await reservasService.getAll();
      setReservas(response.data);
    } catch (error) {
      console.error('Error loading reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (reserva?: Reserva) => {
    if (reserva) {
      setEditingReserva(reserva);
      setFormData({
        huespedId: reserva.huespedId,
        habitacionId: reserva.habitacionId,
        fechaCheckIn: reserva.fechaCheckIn.split('T')[0],
        fechaCheckOut: reserva.fechaCheckOut.split('T')[0],
        numeroHuespedes: reserva.numeroHuespedes,
        numeroNinos: reserva.numeroNinos,
        montoTotal: reserva.montoTotal,
        montoPagado: reserva.montoPagado,
        creadoPor: reserva.creadoPor,
        observaciones: reserva.observaciones,
      });
    } else {
      setEditingReserva(null);
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      setFormData({
        huespedId: 0,
        habitacionId: 0,
        fechaCheckIn: today,
        fechaCheckOut: tomorrow,
        numeroHuespedes: 1,
        numeroNinos: 0,
        montoTotal: 0,
        montoPagado: 0,
        creadoPor: 'Admin',
        observaciones: '',
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
        const updateData: UpdateReservaCommand = {
          reservaId: editingReserva.reservaId,
          habitacionId: formData.habitacionId!,
          fechaCheckIn: formData.fechaCheckIn!,
          fechaCheckOut: formData.fechaCheckOut!,
          numeroHuespedes: formData.numeroHuespedes!,
          numeroNinos: formData.numeroNinos!,
          montoTotal: formData.montoTotal!,
          montoPagado: formData.montoPagado!,
          estado: editingReserva.estado,
          checkInRealizado: editingReserva.checkInRealizado,
          checkOutRealizado: editingReserva.checkOutRealizado,
          observaciones: formData.observaciones,
        };
        await reservasService.update(editingReserva.reservaId, updateData);
      } else {
        await reservasService.create(formData as CreateReservaCommand);
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
        await reservasService.delete(id);
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
      CheckIn: { variant: 'info', label: 'Check-In' },
      CheckOut: { variant: 'success', label: 'Check-Out' },
    };
    const estadoInfo = estados[estado] || { variant: 'default' as const, label: estado };
    return <Badge variant={estadoInfo.variant}>{estadoInfo.label}</Badge>;
  };

  const columns = [
    {
      key: 'reservaId',
      label: 'ID',
      render: (item: Reserva) => (
        <span className="font-mono text-sm">#{item.reservaId}</span>
      ),
    },
    {
      key: 'huespedId',
      label: 'Huésped',
      render: (item: Reserva) => (
        <span className="text-gray-900">Huésped #{item.huespedId}</span>
      ),
    },
    {
      key: 'habitacionId',
      label: 'Habitación',
      render: (item: Reserva) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Home className="w-4 h-4" />
          <span>#{item.habitacionId}</span>
        </div>
      ),
    },
    {
      key: 'fechas',
      label: 'Check-In / Check-Out',
      render: (item: Reserva) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-4 h-4" />
          <div>
            <p className="text-sm">{new Date(item.fechaCheckIn).toLocaleDateString('es-DO')}</p>
            <p className="text-xs text-gray-500">{new Date(item.fechaCheckOut).toLocaleDateString('es-DO')}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'huespedes',
      label: 'Huéspedes',
      render: (item: Reserva) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Users className="w-4 h-4" />
          <div>
            <p className="text-sm">{item.numeroHuespedes} adultos</p>
            {item.numeroNinos > 0 && (
              <p className="text-xs text-gray-500">{item.numeroNinos} niños</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'montos',
      label: 'Monto / Pagado',
      render: (item: Reserva) => (
        <div className="text-gray-900">
          <p className="font-medium">${item.montoTotal.toFixed(2)}</p>
          <p className="text-xs text-green-600">${item.montoPagado.toFixed(2)} pagado</p>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (item: Reserva) => getEstadoBadge(item.estado),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item: Reserva) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.reservaId)}
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
        title="Reservas de Habitaciones"
        subtitle="Gestiona las reservas de habitaciones del hotel"
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
              label="ID de Huésped"
              type="number"
              value={formData.huespedId}
              onChange={(e) => setFormData({ ...formData, huespedId: parseInt(e.target.value) })}
              required
            />

            <Input
              label="ID de Habitación"
              type="number"
              value={formData.habitacionId}
              onChange={(e) => setFormData({ ...formData, habitacionId: parseInt(e.target.value) })}
              required
            />

            <Input
              label="Fecha de Check-In"
              type="date"
              value={formData.fechaCheckIn}
              onChange={(e) => setFormData({ ...formData, fechaCheckIn: e.target.value })}
              required
            />

            <Input
              label="Fecha de Check-Out"
              type="date"
              value={formData.fechaCheckOut}
              onChange={(e) => setFormData({ ...formData, fechaCheckOut: e.target.value })}
              required
            />

            <Input
              label="Número de Huéspedes"
              type="number"
              value={formData.numeroHuespedes}
              onChange={(e) => setFormData({ ...formData, numeroHuespedes: parseInt(e.target.value) })}
              required
            />

            <Input
              label="Número de Niños"
              type="number"
              value={formData.numeroNinos}
              onChange={(e) => setFormData({ ...formData, numeroNinos: parseInt(e.target.value) })}
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

            <Input
              label="Monto Pagado"
              type="number"
              step="0.01"
              value={formData.montoPagado}
              onChange={(e) => setFormData({ ...formData, montoPagado: parseFloat(e.target.value) })}
              required
            />

            <Input
              label="Creado Por"
              value={formData.creadoPor}
              onChange={(e) => setFormData({ ...formData, creadoPor: e.target.value })}
              placeholder="Nombre del administrador"
            />
          </div>

          <Textarea
            label="Observaciones"
            value={formData.observaciones}
            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            placeholder="Notas adicionales sobre la reserva..."
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
