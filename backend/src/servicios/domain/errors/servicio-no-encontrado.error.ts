export class ServicioNoEncontradoError extends Error {
  constructor(public readonly id: string) {
    super(`No existe un servicio con id ${id}`);
    this.name = 'ServicioNoEncontradoError';
  }
}
