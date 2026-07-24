import { Servicio } from '../../../domain/servicio.entity';
import { ServicioRepository } from '../../../domain/ports/servicio.repository';

/** Implementación del puerto ServicioRepository para tests: guarda en un array, sin base de datos. */
export class ServicioRepositoryEnMemoria implements ServicioRepository {
  private servicios: Servicio[] = [];

  async guardar(servicio: Servicio): Promise<void> {
    const indice = this.servicios.findIndex((s) => s.id === servicio.id);
    if (indice === -1) {
      this.servicios.push(servicio);
    } else {
      this.servicios[indice] = servicio;
    }
  }

  async listarTodos(): Promise<Servicio[]> {
    return [...this.servicios];
  }

  async buscarPorId(id: string): Promise<Servicio | null> {
    return this.servicios.find((s) => s.id === id) ?? null;
  }
}
