import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TipoServicio } from '../../../domain/tipo-servicio.enum';

export class CrearServicioDto {
  @IsEnum(TipoServicio)
  tipo: TipoServicio;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  ubicacion: string;
}
