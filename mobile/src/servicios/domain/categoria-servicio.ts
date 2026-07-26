import { EstadoServicio } from './servicio.schema';

const ESTADOS_HISTORIAL: readonly EstadoServicio[] = ['FINALIZADO', 'CANCELADO'];

export function esServicioHistorial(estado: EstadoServicio): boolean {
  return ESTADOS_HISTORIAL.includes(estado);
}

export function esServicioActivo(estado: EstadoServicio): boolean {
  return !esServicioHistorial(estado);
}
