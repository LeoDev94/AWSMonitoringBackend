import { Module } from '@nestjs/common';
import { RespositorioService } from './services/respositorio/respositorio.service';
import { RepositorioController } from './controllers/repositorio/repositorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorioEntity } from './entity/repositorio.entity';
import { ServicioModule } from '../servicio/servicio.module';

@Module({
  imports:[TypeOrmModule.forFeature([RepositorioEntity]),ServicioModule],
  providers: [RespositorioService],
  controllers: [RepositorioController],
  exports:[TypeOrmModule,RespositorioService]
})
export class RepositorioModule {}
