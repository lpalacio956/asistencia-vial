import { EstadoServicio } from '../estado-servicio.enum';

export class TransicionEstadoInvalidaError extends Error {
  constructor(
    public readonly estadoActual: EstadoServicio,
    public readonly estadoSolicitado: EstadoServicio,
  ) {
    super(`No se puede pasar de ${estadoActual} a ${estadoSolicitado}`);
    this.name = 'TransicionEstadoInvalidaError';
  }
}
