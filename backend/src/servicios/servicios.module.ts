import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServiciosController } from './infrastructure/http/servicios.controller';
import { DominioExceptionFilter } from './infrastructure/http/filters/dominio-exception.filter';
import { PrismaService } from './infrastructure/persistence/prisma.service';
import { ServicioRepositoryPrisma } from './infrastructure/persistence/servicio-repository.prisma';
import { ServicioRepository } from './domain/ports/servicio.repository';
import { CrearServicioUseCase } from './application/use-cases/crear-servicio.use-case';
import { ListarServiciosUseCase } from './application/use-cases/listar-servicios.use-case';
import { CambiarEstadoServicioUseCase } from './application/use-cases/cambiar-estado-servicio.use-case';

const SERVICIO_REPOSITORY = Symbol('SERVICIO_REPOSITORY');

@Module({
  controllers: [ServiciosController],
  providers: [
    PrismaService,
    { provide: SERVICIO_REPOSITORY, useClass: ServicioRepositoryPrisma },
    {
      provide: CrearServicioUseCase,
      useFactory: (repositorio: ServicioRepository) => new CrearServicioUseCase(repositorio),
      inject: [SERVICIO_REPOSITORY],
    },
    {
      provide: ListarServiciosUseCase,
      useFactory: (repositorio: ServicioRepository) => new ListarServiciosUseCase(repositorio),
      inject: [SERVICIO_REPOSITORY],
    },
    {
      provide: CambiarEstadoServicioUseCase,
      useFactory: (repositorio: ServicioRepository) =>
        new CambiarEstadoServicioUseCase(repositorio),
      inject: [SERVICIO_REPOSITORY],
    },
    { provide: APP_FILTER, useClass: DominioExceptionFilter },
  ],
})
export class ServiciosModule {}
