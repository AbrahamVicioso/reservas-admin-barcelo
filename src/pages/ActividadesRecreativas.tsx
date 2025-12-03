import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Badge } from '../components/Badge';
import { Table } from '../components/Table';
import { actividadesRecreativasService } from '../services/api';
import type { ActividadRecreativa, CreateActividadRecreativaCommand, UpdateActividadRecreativaCommand } from '../types';

export const ActividadesRecreativas: React.FC = () => {
  const [actividades, setActividades] = useState<ActividadRecreativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActividad, setEditingActividad] = useState<ActividadRecreativa | null>(null);
  const [formData, setFormData] = useState<Partial<CreateActividadRecreativaCommand>>({
    hotelId: 1,
    nombreActividad: '',
    descripcion: '',
    categoria: '',
    ubicacion: '',
    horaApertura: '',
    horaCierre: '',
    capacidadMaxima: 0,
    precioPorPersona: 0,
    requiereReserva: true,
    duracionMinutos: 60,
    imagenUrl: '',
  });

  useEffect(() => {
    loadActividades();
  }, []);

  const loadActividades = async () => {
    try {
      setLoading(true);
      const response = await actividadesRecreativasService.getAll();
      setActividades(response.data);
    } catch (error) {
      console.error('Error loading actividades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (actividad?: ActividadRecreativa) => {
    if (actividad) {
      setEditingActividad(actividad);
      setFormData({
        hotelId: actividad.hotelId,
        nombreActividad: actividad.nombreActividad,
        descripcion: actividad.descripcion,
        categoria: actividad.categoria,
        ubicacion: actividad.ubicacion,
        horaApertura: actividad.horaApertura,
        horaCierre: actividad.horaCierre,
        capacidadMaxima: actividad.capacidadMaxima,
        precioPorPersona: actividad.precioPorPersona,
        requiereReserva: actividad.requiereReserva,
        duracionMinutos: actividad.duracionMinutos,
        imagenUrl: actividad.imagenUrl,
      });
    } else {
      setEditingActividad(null);
      setFormData({
        hotelId: 1,
        nombreActividad: '',
        descripcion: '',
        categoria: '',
        ubicacion: '',
        horaApertura: '09:00:00',
        horaCierre: '18:00:00',
        capacidadMaxima: 0,
        precioPorPersona: 0,
        requiereReserva: true,
        duracionMinutos: 60,
        imagenUrl: '',
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingActividad(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingActividad) {
        const updateData: UpdateActividadRecreativaCommand = {
          actividadId: editingActividad.actividadId,
          nombreActividad: formData.nombreActividad!,
          descripcion: formData.descripcion,
          categoria: formData.categoria!,
          ubicacion: formData.ubicacion!,
          horaApertura: formData.horaApertura!,
          horaCierre: formData.horaCierre!,
          capacidadMaxima: formData.capacidadMaxima!,
          precioPorPersona: formData.precioPorPersona!,
          requiereReserva: formData.requiereReserva!,
          duracionMinutos: formData.duracionMinutos,
          estaActiva: editingActividad.estaActiva,
          imagenUrl: formData.imagenUrl,
        };
        await actividadesRecreativasService.update(editingActividad.actividadId, updateData);
      } else {
        await actividadesRecreativasService.create(formData as CreateActividadRecreativaCommand);
      }
      handleCloseModal();
      loadActividades();
    } catch (error) {
      console.error('Error saving actividad:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        await actividadesRecreativasService.delete(id);
        loadActividades();
      } catch (error) {
        console.error('Error deleting actividad:', error);
      }
    }
  };

  const columns = [
    {
      key: 'nombreActividad',
      label: 'Actividad',
      render: (item: ActividadRecreativa) => (
        <div>
          <p className="font-medium text-gray-900">{item.nombreActividad}</p>
          <p className="text-xs text-gray-500">{item.categoria}</p>
        </div>
      ),
    },
    {
      key: 'ubicacion',
      label: 'Ubicación',
      render: (item: ActividadRecreativa) => (
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{item.ubicacion}</span>
        </div>
      ),
    },
    {
      key: 'horario',
      label: 'Horario',
      render: (item: ActividadRecreativa) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{item.horaApertura} - {item.horaCierre}</span>
        </div>
      ),
    },
    {
      key: 'capacidadMaxima',
      label: 'Capacidad',
      render: (item: ActividadRecreativa) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Users className="w-4 h-4" />
          <span>{item.capacidadMaxima}</span>
        </div>
      ),
    },
    {
      key: 'precioPorPersona',
      label: 'Precio',
      render: (item: ActividadRecreativa) => (
        <div className="flex items-center gap-1 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>${item.precioPorPersona.toFixed(2)}</span>
        </div>
      ),
    },
    {
      key: 'estaActiva',
      label: 'Estado',
      render: (item: ActividadRecreativa) => (
        <Badge variant={item.estaActiva ? 'success' : 'danger'}>
          {item.estaActiva ? 'Activa' : 'Inactiva'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (item: ActividadRecreativa) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.actividadId)}
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
        title="Actividades Recreativas"
        subtitle="Gestiona las actividades recreativas del hotel"
        action={
          <Button onClick={() => handleOpenModal()}>
            <Plus className="w-4 h-4" />
            Nueva Actividad
          </Button>
        }
      >
        <Table data={actividades} columns={columns} />
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingActividad ? 'Editar Actividad' : 'Nueva Actividad'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre de la Actividad"
              value={formData.nombreActividad}
              onChange={(e) => setFormData({ ...formData, nombreActividad: e.target.value })}
              required
            />

            <Input
              label="Categoría"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              placeholder="Ej: Deportes, Entretenimiento"
              required
            />

            <Input
              label="Ubicación"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              required
            />

            <Input
              label="Hora de Apertura"
              type="time"
              value={formData.horaApertura}
              onChange={(e) => setFormData({ ...formData, horaApertura: e.target.value + ':00' })}
              required
            />

            <Input
              label="Hora de Cierre"
              type="time"
              value={formData.horaCierre}
              onChange={(e) => setFormData({ ...formData, horaCierre: e.target.value + ':00' })}
              required
            />

            <Input
              label="Capacidad Máxima"
              type="number"
              value={formData.capacidadMaxima}
              onChange={(e) => setFormData({ ...formData, capacidadMaxima: parseInt(e.target.value) })}
              required
            />

            <Input
              label="Precio por Persona"
              type="number"
              step="0.01"
              value={formData.precioPorPersona}
              onChange={(e) => setFormData({ ...formData, precioPorPersona: parseFloat(e.target.value) })}
              required
            />

            <Input
              label="Duración (minutos)"
              type="number"
              value={formData.duracionMinutos}
              onChange={(e) => setFormData({ ...formData, duracionMinutos: parseInt(e.target.value) })}
            />

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                id="requiereReserva"
                checked={formData.requiereReserva}
                onChange={(e) => setFormData({ ...formData, requiereReserva: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="requiereReserva" className="text-sm text-gray-700">
                Requiere Reserva
              </label>
            </div>
          </div>

          <Textarea
            label="Descripción"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Describe la actividad..."
          />

          <Input
            label="URL de Imagen"
            value={formData.imagenUrl}
            onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
            placeholder="https://..."
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingActividad ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
