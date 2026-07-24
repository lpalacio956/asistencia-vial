import { Servicio } from '../../domain/servicio.entity';

export interface ServicioRespuesta {
  id: string;
  tipo: string;
  estado: string;
  descripcion: string;
  ubicacion: string;
  creadoEn: Date;
  actualizadoEn: Date;
}

export function aServicioRespuesta(servicio: Servicio): ServicioRespuesta {
  return {
    id: servicio.id,
    tipo: servicio.tipo,
    estado: servicio.estado,
    descripcion: servicio.descripcion,
    ubicacion: servicio.ubicacion,
    creadoEn: servicio.creadoEn,
    actualizadoEn: servicio.actualizadoEn,
  };
}
