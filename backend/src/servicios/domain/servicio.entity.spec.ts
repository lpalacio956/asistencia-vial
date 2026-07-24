import { Servicio } from './servicio.entity';
import { TipoServicio } from './tipo-servicio.enum';
import { EstadoServicio } from './estado-servicio.enum';
import { TransicionEstadoInvalidaError } from './errors/transicion-estado-invalida.error';

function crearServicioDePrueba(): Servicio {
  return Servicio.crear({
    tipo: TipoServicio.GRUA,
    descripcion: 'Vehículo varado en la vía',
    ubicacion: 'Autopista Norte km 12',
  });
}

describe('Servicio', () => {
  it('nace en estado PENDIENTE', () => {
    const servicio = crearServicioDePrueba();

    expect(servicio.estado).toBe(EstadoServicio.PENDIENTE);
  });

  it('permite la secuencia completa PENDIENTE -> ASIGNADO -> EN_RUTA -> FINALIZADO', () => {
    const servicio = crearServicioDePrueba();

    servicio.cambiarEstado(EstadoServicio.ASIGNADO);
    expect(servicio.estado).toBe(EstadoServicio.ASIGNADO);

    servicio.cambiarEstado(EstadoServicio.EN_RUTA);
    expect(servicio.estado).toBe(EstadoServicio.EN_RUTA);

    servicio.cambiarEstado(EstadoServicio.FINALIZADO);
    expect(servicio.estado).toBe(EstadoServicio.FINALIZADO);
  });

  it('permite cancelar desde PENDIENTE', () => {
    const servicio = crearServicioDePrueba();

    servicio.cambiarEstado(EstadoServicio.CANCELADO);

    expect(servicio.estado).toBe(EstadoServicio.CANCELADO);
  });

  it('permite cancelar desde ASIGNADO', () => {
    const servicio = crearServicioDePrueba();
    servicio.cambiarEstado(EstadoServicio.ASIGNADO);

    servicio.cambiarEstado(EstadoServicio.CANCELADO);

    expect(servicio.estado).toBe(EstadoServicio.CANCELADO);
  });

  it('rechaza cancelar una vez que el servicio está EN_RUTA', () => {
    const servicio = crearServicioDePrueba();
    servicio.cambiarEstado(EstadoServicio.ASIGNADO);
    servicio.cambiarEstado(EstadoServicio.EN_RUTA);

    expect(() => servicio.cambiarEstado(EstadoServicio.CANCELADO)).toThrow(
      TransicionEstadoInvalidaError,
    );
  });

  it('rechaza saltar de PENDIENTE directo a EN_RUTA', () => {
    const servicio = crearServicioDePrueba();

    expect(() => servicio.cambiarEstado(EstadoServicio.EN_RUTA)).toThrow(
      TransicionEstadoInvalidaError,
    );
  });

  it('rechaza cualquier transición desde un estado terminal (FINALIZADO)', () => {
    const servicio = crearServicioDePrueba();
    servicio.cambiarEstado(EstadoServicio.ASIGNADO);
    servicio.cambiarEstado(EstadoServicio.EN_RUTA);
    servicio.cambiarEstado(EstadoServicio.FINALIZADO);

    expect(() => servicio.cambiarEstado(EstadoServicio.PENDIENTE)).toThrow(
      TransicionEstadoInvalidaError,
    );
  });

  it('el error de transición inválida expone el estado actual y el solicitado', () => {
    const servicio = crearServicioDePrueba();

    try {
      servicio.cambiarEstado(EstadoServicio.EN_RUTA);
      fail('Debió lanzar TransicionEstadoInvalidaError');
    } catch (error) {
      expect(error).toBeInstanceOf(TransicionEstadoInvalidaError);
      expect((error as TransicionEstadoInvalidaError).estadoActual).toBe(
        EstadoServicio.PENDIENTE,
      );
      expect((error as TransicionEstadoInvalidaError).estadoSolicitado).toBe(
        EstadoServicio.EN_RUTA,
      );
    }
  });
});
