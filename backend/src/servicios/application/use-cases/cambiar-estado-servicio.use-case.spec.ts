import { CambiarEstadoServicioUseCase } from './cambiar-estado-servicio.use-case';
import { CrearServicioUseCase } from './crear-servicio.use-case';
import { ServicioRepositoryEnMemoria } from './__fakes__/servicio-repository-en-memoria';
import { Servicio } from '../../domain/servicio.entity';
import { TipoServicio } from '../../domain/tipo-servicio.enum';
import { EstadoServicio } from '../../domain/estado-servicio.enum';
import { ServicioNoEncontradoError } from '../../domain/errors/servicio-no-encontrado.error';
import { TransicionEstadoInvalidaError } from '../../domain/errors/transicion-estado-invalida.error';

async function crearServicioDePrueba(
  repositorio: ServicioRepositoryEnMemoria,
): Promise<Servicio> {
  const crear = new CrearServicioUseCase(repositorio);
  return crear.ejecutar({
    tipo: TipoServicio.CERRAJERIA,
    descripcion: 'Puerta bloqueada',
    ubicacion: 'Centro comercial',
  });
}

describe('CambiarEstadoServicioUseCase', () => {
  it('cambia el estado del servicio y persiste el cambio', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const servicioCreado = await crearServicioDePrueba(repositorio);
    const useCase = new CambiarEstadoServicioUseCase(repositorio);

    const servicioActualizado = await useCase.ejecutar({
      id: servicioCreado.id,
      estadoSiguiente: EstadoServicio.ASIGNADO,
    });

    expect(servicioActualizado.estado).toBe(EstadoServicio.ASIGNADO);
    const guardado = await repositorio.buscarPorId(servicioCreado.id);
    expect(guardado?.estado).toBe(EstadoServicio.ASIGNADO);
  });

  it('lanza ServicioNoEncontradoError si el id no existe', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const useCase = new CambiarEstadoServicioUseCase(repositorio);

    await expect(
      useCase.ejecutar({ id: 'id-inexistente', estadoSiguiente: EstadoServicio.ASIGNADO }),
    ).rejects.toThrow(ServicioNoEncontradoError);
  });

  it('propaga TransicionEstadoInvalidaError cuando la transición no está permitida', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const servicioCreado = await crearServicioDePrueba(repositorio);
    const useCase = new CambiarEstadoServicioUseCase(repositorio);

    await expect(
      useCase.ejecutar({ id: servicioCreado.id, estadoSiguiente: EstadoServicio.EN_RUTA }),
    ).rejects.toThrow(TransicionEstadoInvalidaError);
  });
});
