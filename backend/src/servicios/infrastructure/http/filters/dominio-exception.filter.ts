import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TransicionEstadoInvalidaError } from '../../../domain/errors/transicion-estado-invalida.error';
import { ServicioNoEncontradoError } from '../../../domain/errors/servicio-no-encontrado.error';

type ErrorDeDominio = TransicionEstadoInvalidaError | ServicioNoEncontradoError;

@Catch(TransicionEstadoInvalidaError, ServicioNoEncontradoError)
export class DominioExceptionFilter implements ExceptionFilter {
  catch(excepcion: ErrorDeDominio, host: ArgumentsHost): void {
    const respuesta = host.switchToHttp().getResponse<Response>();
    const statusCode =
      excepcion instanceof ServicioNoEncontradoError
        ? HttpStatus.NOT_FOUND
        : HttpStatus.CONFLICT;

    respuesta.status(statusCode).json({
      statusCode,
      message: excepcion.message,
      error: excepcion.name,
    });
  }
}
