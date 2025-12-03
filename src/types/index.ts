// Actividades Recreativas
export interface ActividadRecreativa {
  actividadId: number;
  hotelId: number;
  nombreActividad: string;
  descripcion?: string;
  categoria: string;
  ubicacion: string;
  horaApertura: string;
  horaCierre: string;
  capacidadMaxima: number;
  precioPorPersona: number;
  requiereReserva: boolean;
  duracionMinutos?: number;
  estaActiva: boolean;
  imagenUrl?: string;
}

export interface CreateActividadRecreativaCommand {
  hotelId: number;
  nombreActividad: string;
  descripcion?: string;
  categoria: string;
  ubicacion: string;
  horaApertura: string;
  horaCierre: string;
  capacidadMaxima: number;
  precioPorPersona: number;
  requiereReserva: boolean;
  duracionMinutos?: number;
  imagenUrl?: string;
}

export interface UpdateActividadRecreativaCommand {
  actividadId: number;
  nombreActividad: string;
  descripcion?: string;
  categoria: string;
  ubicacion: string;
  horaApertura: string;
  horaCierre: string;
  capacidadMaxima: number;
  precioPorPersona: number;
  requiereReserva: boolean;
  duracionMinutos?: number;
  estaActiva: boolean;
  imagenUrl?: string;
}

// Reservas Actividades
export interface ReservaActividad {
  reservaActividadId: number;
  actividadId: number;
  huespedId: number;
  fechaReserva: string;
  horaReserva: string;
  numeroPersonas: number;
  estado: string;
  montoTotal: number;
  notasEspeciales?: string;
  recordatorioEnviado: boolean;
  fechaRecordatorio?: string;
}

export interface CreateReservaActividadCommand {
  actividadId: number;
  huespedId: number;
  fechaReserva: string;
  horaReserva: string;
  numeroPersonas: number;
  montoTotal: number;
  notasEspeciales?: string;
}

export interface UpdateReservaActividadCommand {
  reservaActividadId: number;
  fechaReserva: string;
  horaReserva: string;
  numeroPersonas: number;
  estado: string;
  montoTotal: number;
  notasEspeciales?: string;
  recordatorioEnviado: boolean;
  fechaRecordatorio?: string;
}

// Reservas
export interface Reserva {
  reservaId: number;
  huespedId: number;
  habitacionId: number;
  fechaCheckIn: string;
  fechaCheckOut: string;
  numeroHuespedes: number;
  numeroNinos: number;
  montoTotal: number;
  montoPagado: number;
  estado: string;
  checkInRealizado?: string;
  checkOutRealizado?: string;
  creadoPor?: string;
  observaciones?: string;
}

export interface CreateReservaCommand {
  huespedId: number;
  habitacionId: number;
  fechaCheckIn: string;
  fechaCheckOut: string;
  numeroHuespedes: number;
  numeroNinos: number;
  montoTotal: number;
  montoPagado: number;
  creadoPor?: string;
  observaciones?: string;
}

export interface UpdateReservaCommand {
  reservaId: number;
  habitacionId: number;
  fechaCheckIn: string;
  fechaCheckOut: string;
  numeroHuespedes: number;
  numeroNinos: number;
  montoTotal: number;
  montoPagado: number;
  estado: string;
  checkInRealizado?: string;
  checkOutRealizado?: string;
  observaciones?: string;
}

// Authentication Types
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface InfoResponse {
  email: string;
  isEmailConfirmed: boolean;
}

export interface User {
  email: string;
  isEmailConfirmed: boolean;
}
