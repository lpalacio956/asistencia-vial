import { Module } from '@nestjs/common';
import { ServiciosModule } from './servicios/servicios.module';

@Module({
  imports: [ServiciosModule],
})
export class AppModule {}
