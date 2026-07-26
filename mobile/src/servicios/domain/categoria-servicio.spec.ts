import { esServicioActivo, esServicioHistorial } from './categoria-servicio';
import { EstadoServicio } from './servicio.schema';

const ESTADOS_ACTIVOS: EstadoServicio[] = ['PENDIENTE', 'ASIGNADO', 'EN_RUTA'];
const ESTADOS_HISTORIAL: EstadoServicio[] = ['FINALIZADO', 'CANCELADO'];

describe('categoria-servicio', () => {
  it.each(ESTADOS_ACTIVOS)('%s es activo y no es historial', (estado) => {
    expect(esServicioActivo(estado)).toBe(true);
    expect(esServicioHistorial(estado)).toBe(false);
  });

  it.each(ESTADOS_HISTORIAL)('%s es historial y no es activo', (estado) => {
    expect(esServicioActivo(estado)).toBe(false);
    expect(esServicioHistorial(estado)).toBe(true);
  });
});
