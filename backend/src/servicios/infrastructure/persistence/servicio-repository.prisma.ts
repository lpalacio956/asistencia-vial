import { Injectable } from '@nestjs/common';
import { Servicio as ServicioPrisma } from '@prisma/client';
import { ServicioRepository } from '../../domain/ports/servicio.repository';
import { Servicio } from '../../domain/servicio.entity';
import { TipoServicio } from '../../domain/tipo-servicio.enum';
import { EstadoServicio } from '../../domain/estado-servicio.enum';
import { PrismaService } from './prisma.service';

@Injectable()
export class ServicioRepositoryPrisma implements ServicioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async guardar(servicio: Servicio): Promise<void> {
    await this.prisma.servicio.upsert({
      where: { id: servicio.id },
      create: {
        id: servicio.id,
        tipo: servicio.tipo,
        estado: servicio.estado,
        descripcion: servicio.descripcion,
        ubicacion: servicio.ubicacion,
        creadoEn: servicio.creadoEn,
        actualizadoEn: servicio.actualizadoEn,
      },
      update: {
        estado: servicio.estado,
        actualizadoEn: servicio.actualizadoEn,
      },
    });
  }

  async listarTodos(): Promise<Servicio[]> {
    const filas = await this.prisma.servicio.findMany({
      orderBy: { creadoEn: 'desc' },
    });
    return filas.map((fila) => this.aDominio(fila));
  }

  async buscarPorId(id: string): Promise<Servicio | null> {
    const fila = await this.prisma.servicio.findUnique({ where: { id } });
    return fila ? this.aDominio(fila) : null;
  }

  private aDominio(fila: ServicioPrisma): Servicio {
    return Servicio.reconstruir({
      id: fila.id,
      tipo: fila.tipo as TipoServicio,
      estado: fila.estado as EstadoServicio,
      descripcion: fila.descripcion,
      ubicacion: fila.ubicacion,
      creadoEn: fila.creadoEn,
      actualizadoEn: fila.actualizadoEn,
    });
  }
}
