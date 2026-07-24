import { IsEnum } from 'class-validator';
import { EstadoServicio } from '../../../domain/estado-servicio.enum';

export class CambiarEstadoServicioDto {
  @IsEnum(EstadoServicio)
  estado: EstadoServicio;
}
