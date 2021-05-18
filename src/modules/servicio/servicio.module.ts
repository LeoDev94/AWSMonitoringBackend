import { Module } from '@nestjs/common';
import { ServicioService } from './services/servicio/servicio.service';
import { ServicioController } from './controller/servicio/servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from './entity/servicio.entity';
import UtilsClass from 'src/utils/costs';

@Module({
  imports:[TypeOrmModule.forFeature([ServicioEntity]),UtilsClass],
  providers: [ServicioService],
  controllers: [ServicioController],
  exports:[ServicioService]
})
export class ServicioModule {}
