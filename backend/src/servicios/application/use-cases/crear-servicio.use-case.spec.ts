import { CrearServicioUseCase } from './crear-servicio.use-case';
import { ServicioRepositoryEnMemoria } from './__fakes__/servicio-repository-en-memoria';
import { TipoServicio } from '../../domain/tipo-servicio.enum';
import { EstadoServicio } from '../../domain/estado-servicio.enum';

describe('CrearServicioUseCase', () => {
  it('crea un servicio en estado PENDIENTE y lo persiste en el repositorio', async () => {
    const repositorio = new ServicioRepositoryEnMemoria();
    const useCase = new CrearServicioUseCase(repositorio);

    const servicio = await useCase.ejecutar({
      tipo: TipoServicio.BATERIA,
      descripcion: 'Batería descargada',
      ubicacion: 'Calle 10 # 5-20',
    });

    expect(servicio.estado).toBe(EstadoServicio.PENDIENTE);

    const guardados = await repositorio.listarTodos();
    expect(guardados).toHaveLength(1);
    expect(guardados[0].id).toBe(servicio.id);
  });
});
