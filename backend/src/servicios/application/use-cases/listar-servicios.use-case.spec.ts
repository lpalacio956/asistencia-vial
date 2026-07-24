import { ListarServiciosUseCase } from './listar-servicios.use-case';
import { CrearServicioUseCase } from './crear-servicio.use-case';
import { ServicioRepositoryEnMemoria } from './__fakes__/servicio-repository-en-memoria';
import { TipoServicio } from '../../domain/tipo-servicio.enum';

describe('ListarServiciosUseCase', () => {
  it('retorna una lista vacía cuando no hay servicios creados', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const useCase = new ListarServiciosUseCase(repositorio);

    const servicios = await useCase.ejecutar();

    expect(servicios).toEqual([]);
  });

  it('retorna todos los servicios que fueron creados', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const crear = new CrearServicioUseCase(repositorio);
    const listar = new ListarServiciosUseCase(repositorio);

    await crear.ejecutar({
      tipo: TipoServicio.LLANTA,
      descripcion: 'Llanta pinchada',
      ubicacion: 'Cra 7 # 45-12',
    });
    await crear.ejecutar({
      tipo: TipoServicio.GRUA,
      descripcion: 'Vehículo varado',
      ubicacion: 'Autopista Sur',
    });

    const servicios = await listar.ejecutar();

    expect(servicios).toHaveLength(2);
  });
});
