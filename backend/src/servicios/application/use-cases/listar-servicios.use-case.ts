import { Servicio } from '../../domain/servicio.entity';
import { ServicioRepository } from '../../domain/ports/servicio.repository';

export class ListarServiciosUseCase {
  constructor(private readonly servicioRepository: ServicioRepository) {}

  async ejecutar(): Promise<Servicio[]> {
    return this.servicioRepository.listarTodos();
  }
}
