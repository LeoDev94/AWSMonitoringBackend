import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoController } from './controller/proyecto/proyecto.controller';
import { ProyectoEntity } from './entity/proyecto.entity';
import { ProyectoService } from './services/proyecto/proyecto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  controllers: [ProyectoController],
  providers: [ProyectoService]
})
export class ProyectoModule {}
