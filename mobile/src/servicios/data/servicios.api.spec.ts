import { serviciosApi } from './servicios.api';
import { ErrorApi } from './api.error';

function respuestaFalsa(
  cuerpo: unknown,
  opciones: { ok: boolean; status: number; statusText?: string },
): Response {
  return {
    ok: opciones.ok,
    status: opciones.status,
    statusText: opciones.statusText ?? '',
    json: async () => cuerpo,
  } as Response;
}

describe('serviciosApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('listar', () => {
    it('devuelve la lista de servicios cuando el backend responde 200', async () => {
      const servicio = {
        id: '1',
        tipo: 'GRUA',
        estado: 'PENDIENTE',
        descripcion: 'Vehículo varado',
        ubicacion: 'Autopista Norte km 12',
        creadoEn: '2026-01-01T00:00:00.000Z',
        actualizadoEn: '2026-01-01T00:00:00.000Z',
      };
      global.fetch = jest
        .fn()
        .mockResolvedValue(respuestaFalsa([servicio], { ok: true, status: 200 }));

      const servicios = await serviciosApi.listar();

      expect(servicios).toHaveLength(1);
      expect(servicios[0].id).toBe('1');
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/servicios');
    });

    it('lanza ErrorApi si el backend responde un error', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValue(respuestaFalsa({ message: 'fallo interno' }, { ok: false, status: 500 }));

      await expect(serviciosApi.listar()).rejects.toThrow(ErrorApi);
    });

    it('lanza un error si la respuesta no tiene la forma esperada por el schema', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValue(respuestaFalsa([{ id: '1' }], { ok: true, status: 200 }));

      await expect(serviciosApi.listar()).rejects.toThrow();
    });
  });

  describe('crear', () => {
    it('envía POST con el body correcto y devuelve el servicio creado', async () => {
      const servicioCreado = {
        id: '2',
        tipo: 'BATERIA',
        estado: 'PENDIENTE',
        descripcion: 'Batería descargada',
        ubicacion: 'Calle 10 # 5-20',
        creadoEn: '2026-01-01T00:00:00.000Z',
        actualizadoEn: '2026-01-01T00:00:00.000Z',
      };
      global.fetch = jest
        .fn()
        .mockResolvedValue(respuestaFalsa(servicioCreado, { ok: true, status: 201 }));

      const datosCrear = {
        tipo: 'BATERIA' as const,
        descripcion: 'Batería descargada',
        ubicacion: 'Calle 10 # 5-20',
      };
      const servicio = await serviciosApi.crear(datosCrear);

      expect(servicio.id).toBe('2');
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/servicios',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosCrear),
        }),
      );
    });
  });

  describe('cambiarEstado', () => {
    it('lanza ErrorApi con el mensaje del backend cuando la transición es inválida (409)', async () => {
      global.fetch = jest.fn().mockResolvedValue(
        respuestaFalsa(
          {
            statusCode: 409,
            message: 'No se puede pasar de ASIGNADO a FINALIZADO',
            error: 'TransicionEstadoInvalidaError',
          },
          { ok: false, status: 409 },
        ),
      );

      await expect(serviciosApi.cambiarEstado('1', 'FINALIZADO')).rejects.toMatchObject({
        status: 409,
        message: 'No se puede pasar de ASIGNADO a FINALIZADO',
      });
    });
  });
});
