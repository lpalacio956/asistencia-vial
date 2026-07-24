import { Servicio } from '../servicio.entity';

export interface ServicioRepository {
  guardar(servicio: Servicio): Promise<void>;
  listarTodos(): Promise<Servicio[]>;
  buscarPorId(id: string): Promise<Servicio | null>;
}
