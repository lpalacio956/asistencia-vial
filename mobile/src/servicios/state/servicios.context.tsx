import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { EstadoServicio, Servicio } from '../domain/servicio.schema';
import { CrearServicioInput } from '../domain/crear-servicio.schema';
import { esServicioActivo, esServicioHistorial } from '../domain/categoria-servicio';
import { serviciosApi } from '../data/servicios.api';
import { ErrorApi } from '../data/api.error';

export interface ServiciosContextValor {
  servicios: Servicio[];
  serviciosActivos: Servicio[];
  serviciosHistorial: Servicio[];
  cargando: boolean;
  error: string | null;
  recargar: () => Promise<void>;
  crearServicio: (datos: CrearServicioInput) => Promise<void>;
  cambiarEstadoServicio: (id: string, estado: EstadoServicio) => Promise<void>;
}

export const ServiciosContext = createContext<ServiciosContextValor | undefined>(undefined);

function mensajeDeError(error: unknown): string {
  if (error instanceof ErrorApi) {
    return error.message;
  }
  return 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
}

export function ServiciosProvider({ children }: { children: ReactNode }) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await serviciosApi.listar();
      setServicios(datos);
    } catch (errorDesconocido) {
      setError(mensajeDeError(errorDesconocido));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const crearServicio = useCallback(async (datos: CrearServicioInput) => {
    const servicioCreado = await serviciosApi.crear(datos);
    setServicios((actuales) => [servicioCreado, ...actuales]);
  }, []);

  const cambiarEstadoServicio = useCallback(async (id: string, estado: EstadoServicio) => {
    const servicioActualizado = await serviciosApi.cambiarEstado(id, estado);
    setServicios((actuales) =>
      actuales.map((servicio) => (servicio.id === id ? servicioActualizado : servicio)),
    );
  }, []);

  // Un solo array cargado desde el backend; estas son vistas derivadas, no fetches nuevos.
  const serviciosActivos = useMemo(
    () => servicios.filter((servicio) => esServicioActivo(servicio.estado)),
    [servicios],
  );
  const serviciosHistorial = useMemo(
    () => servicios.filter((servicio) => esServicioHistorial(servicio.estado)),
    [servicios],
  );

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        serviciosActivos,
        serviciosHistorial,
        cargando,
        error,
        recargar,
        crearServicio,
        cambiarEstadoServicio,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}
