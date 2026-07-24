import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CrearServicioUseCase } from '../../application/use-cases/crear-servicio.use-case';
import { ListarServiciosUseCase } from '../../application/use-cases/listar-servicios.use-case';
import { CambiarEstadoServicioUseCase } from '../../application/use-cases/cambiar-estado-servicio.use-case';
import { CrearServicioDto } from './dto/crear-servicio.dto';
import { CambiarEstadoServicioDto } from './dto/cambiar-estado-servicio.dto';
import { aServicioRespuesta, ServicioRespuesta } from './servicio.presenter';

@Controller('servicios')
export class ServiciosController {
  constructor(
    private readonly crearServicioUseCase: CrearServicioUseCase,
    private readonly listarServiciosUseCase: ListarServiciosUseCase,
    private readonly cambiarEstadoServicioUseCase: CambiarEstadoServicioUseCase,
  ) {}

  @Get()
  async listar(): Promise<ServicioRespuesta[]> {
    const servicios = await this.listarServiciosUseCase.ejecutar();
    return servicios.map(aServicioRespuesta);
  }

  @Post()
  async crear(@Body() dto: CrearServicioDto): Promise<ServicioRespuesta> {
    const servicio = await this.crearServicioUseCase.ejecutar(dto);
    return aServicioRespuesta(servicio);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoServicioDto,
  ): Promise<ServicioRespuesta> {
    const servicio = await this.cambiarEstadoServicioUseCase.ejecutar({
      id,
      estadoSiguiente: dto.estado,
    });
    return aServicioRespuesta(servicio);
  }
}
