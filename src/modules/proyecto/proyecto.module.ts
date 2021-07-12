import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorioModule } from '../repositorio/repositorio.module';
import { ServicioModule } from '../servicio/servicio.module';
import { ProyectoController } from './controller/proyecto/proyecto.controller';
import { ProyectoEntity } from './entity/proyecto.entity';
import { ProyectoService } from './services/proyecto/proyecto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity]),ServicioModule,RepositorioModule],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports:[ProyectoService]
})
export class ProyectoModule {}
