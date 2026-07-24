import { EstadoServicio } from './estado-servicio.enum';

const TRANSICIONES_PERMITIDAS: Record<EstadoServicio, EstadoServicio[]> = {
  [EstadoServicio.PENDIENTE]: [EstadoServicio.ASIGNADO, EstadoServicio.CANCELADO],
  [EstadoServicio.ASIGNADO]: [EstadoServicio.EN_RUTA, EstadoServicio.CANCELADO],
  [EstadoServicio.EN_RUTA]: [EstadoServicio.FINALIZADO],
  [EstadoServicio.FINALIZADO]: [],
  [EstadoServicio.CANCELADO]: [],
};

export function esTransicionValida(
  estadoActual: EstadoServicio,
  estadoSiguiente: EstadoServicio,
): boolean {
  return TRANSICIONES_PERMITIDAS[estadoActual].includes(estadoSiguiente);
}
