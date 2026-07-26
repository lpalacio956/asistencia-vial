import { EstadoServicio } from './servicio.schema';

/**
 * Espejo de la tabla de transiciones del backend (backend/src/servicios/domain/transiciones-estado.ts).
 * Solo para guiar la UI (qué botones mostrar) — el backend sigue siendo quien valida y rechaza.
 */
const TRANSICIONES_PERMITIDAS: Record<EstadoServicio, EstadoServicio[]> = {
  PENDIENTE: ['ASIGNADO', 'CANCELADO'],
  ASIGNADO: ['EN_RUTA', 'CANCELADO'],
  EN_RUTA: ['FINALIZADO'],
  FINALIZADO: [],
  CANCELADO: [],
};

export function transicionesPermitidas(estado: EstadoServicio): EstadoServicio[] {
  return TRANSICIONES_PERMITIDAS[estado];
}
