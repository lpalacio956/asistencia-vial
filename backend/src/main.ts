import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS abierto: la app móvil corre en otro dispositivo (Expo Go), no en este mismo origen.
  app.enableCors();

  // whitelist: descarta campos no declarados en el DTO. transform: castea el body al tipo del DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 0.0.0.0 en vez de localhost: para que el teléfono con Expo Go (otra máquina en la LAN) pueda llegar aquí.
  const puerto = process.env.PORT ?? 3000;
  await app.listen(puerto, '0.0.0.0');
  console.log(`Backend escuchando en http://0.0.0.0:${puerto}`);
}
bootstrap();
