import { DatosNuevoServicio, Servicio } from '../../domain/servicio.entity';
import { ServicioRepository } from '../../domain/ports/servicio.repository';

export class CrearServicioUseCase {
  constructor(private readonly servicioRepository: ServicioRepository) {}

  async ejecutar(datos: DatosNuevoServicio): Promise<Servicio> {
    const servicio = Servicio.crear(datos);
    await this.servicioRepository.guardar(servicio);
    return servicio;
  }
}
