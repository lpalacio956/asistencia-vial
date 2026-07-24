import { randomUUID } from 'crypto';
import { TipoServicio } from './tipo-servicio.enum';
import { EstadoServicio } from './estado-servicio.enum';
import { esTransicionValida } from './transiciones-estado';
import { TransicionEstadoInvalidaError } from './errors/transicion-estado-invalida.error';

export interface DatosNuevoServicio {
  tipo: TipoServicio;
  descripcion: string;
  ubicacion: string;
}

export interface DatosServicioExistente {
  id: string;
  tipo: TipoServicio;
  estado: EstadoServicio;
  descripcion: string;
  ubicacion: string;
  creadoEn: Date;
  actualizadoEn: Date;
}

export class Servicio {
  private _estado: EstadoServicio;
  private _actualizadoEn: Date;

  private constructor(
    public readonly id: string,
    public readonly tipo: TipoServicio,
    estado: EstadoServicio,
    public readonly descripcion: string,
    public readonly ubicacion: string,
    public readonly creadoEn: Date,
    actualizadoEn: Date,
  ) {
    this._estado = estado;
    this._actualizadoEn = actualizadoEn;
  }

  /** Crea un servicio nuevo: siempre nace en PENDIENTE. */
  static crear(datos: DatosNuevoServicio): Servicio {
    const ahora = new Date();
    return new Servicio(
      randomUUID(),
      datos.tipo,
      EstadoServicio.PENDIENTE,
      datos.descripcion,
      datos.ubicacion,
      ahora,
      ahora,
    );
  }

  /** Reconstruye un servicio ya existente a partir de datos persistidos. */
  static reconstruir(datos: DatosServicioExistente): Servicio {
    return new Servicio(
      datos.id,
      datos.tipo,
      datos.estado,
      datos.descripcion,
      datos.ubicacion,
      datos.creadoEn,
      datos.actualizadoEn,
    );
  }

  get estado(): EstadoServicio {
    return this._estado;
  }

  get actualizadoEn(): Date {
    return this._actualizadoEn;
  }

  /** Única forma permitida de mutar el estado: valida la transición contra las reglas del dominio. */
  cambiarEstado(estadoSiguiente: EstadoServicio): void {
    if (!esTransicionValida(this._estado, estadoSiguiente)) {
      throw new TransicionEstadoInvalidaError(this._estado, estadoSiguiente);
    }
    this._estado = estadoSiguiente;
    this._actualizadoEn = new Date();
  }
}
