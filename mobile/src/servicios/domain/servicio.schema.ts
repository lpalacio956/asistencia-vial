import { z } from 'zod';

export const TipoServicioSchema = z.enum(['GRUA', 'BATERIA', 'LLANTA', 'COMBUSTIBLE', 'CERRAJERIA']);
export type TipoServicio = z.infer<typeof TipoServicioSchema>;

export const EstadoServicioSchema = z.enum([
  'PENDIENTE',
  'ASIGNADO',
  'EN_RUTA',
  'FINALIZADO',
  'CANCELADO',
]);
export type EstadoServicio = z.infer<typeof EstadoServicioSchema>;

export const ServicioSchema = z.object({
  id: z.string(),
  tipo: TipoServicioSchema,
  estado: EstadoServicioSchema,
  descripcion: z.string(),
  ubicacion: z.string(),
  creadoEn: z.string(),
  actualizadoEn: z.string(),
});
export type Servicio = z.infer<typeof ServicioSchema>;

export const ListaServiciosSchema = z.array(ServicioSchema);
