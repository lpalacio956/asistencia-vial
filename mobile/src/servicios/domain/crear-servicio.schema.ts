import { z } from 'zod';
import { TipoServicioSchema } from './servicio.schema';

export const CrearServicioSchema = z.object({
  tipo: TipoServicioSchema,
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria'),
  ubicacion: z.string().trim().min(1, 'La ubicación es obligatoria'),
});
export type CrearServicioInput = z.infer<typeof CrearServicioSchema>;
