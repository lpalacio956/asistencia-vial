import { env } from '../../config/env';
import {
  EstadoServicio,
  ListaServiciosSchema,
  Servicio,
  ServicioSchema,
} from '../domain/servicio.schema';
import { CrearServicioInput } from '../domain/crear-servicio.schema';
import { ErrorApi } from './api.error';

async function leerCuerpoJson(respuesta: Response): Promise<unknown> {
  return respuesta.json().catch(() => null);
}

async function manejarRespuesta(respuesta: Response): Promise<unknown> {
  const cuerpo = await leerCuerpoJson(respuesta);

  if (!respuesta.ok) {
    const mensaje = (cuerpo as { message?: string | string[] })?.message ?? respuesta.statusText;
    throw new ErrorApi(respuesta.status, Array.isArray(mensaje) ? mensaje.join(', ') : mensaje);
  }

  return cuerpo;
}

export const serviciosApi = {
  async listar(): Promise<Servicio[]> {
    const respuesta = await fetch(`${env.apiUrl}/servicios`);
    const cuerpo = await manejarRespuesta(respuesta);
    return ListaServiciosSchema.parse(cuerpo);
  },

  async crear(datos: CrearServicioInput): Promise<Servicio> {
    const respuesta = await fetch(`${env.apiUrl}/servicios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const cuerpo = await manejarRespuesta(respuesta);
    return ServicioSchema.parse(cuerpo);
  },

  async cambiarEstado(id: string, estado: EstadoServicio): Promise<Servicio> {
    const respuesta = await fetch(`${env.apiUrl}/servicios/${id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    });
    const cuerpo = await manejarRespuesta(respuesta);
    return ServicioSchema.parse(cuerpo);
  },
};
