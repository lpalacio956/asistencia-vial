import { Servicio } from '../../domain/servicio.entity';
import { EstadoServicio } from '../../domain/estado-servicio.enum';
import { ServicioRepository } from '../../domain/ports/servicio.repository';
import { ServicioNoEncontradoError } from '../../domain/errors/servicio-no-encontrado.error';

export interface DatosCambioEstado {
  id: string;
  estadoSiguiente: EstadoServicio;
}

export class CambiarEstadoServicioUseCase {
  constructor(private readonly servicioRepository: ServicioRepository) {}

  async ejecutar(datos: DatosCambioEstado): Promise<Servicio> {
    const servicio = await this.servicioRepository.buscarPorId(datos.id);
    if (!servicio) {
      throw new ServicioNoEncontradoError(datos.id);
    }

    servicio.cambiarEstado(datos.estadoSiguiente);
    await this.servicioRepository.guardar(servicio);
    return servicio;
  }
}
