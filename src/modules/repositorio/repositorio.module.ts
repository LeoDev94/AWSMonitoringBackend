import { Module } from '@nestjs/common';
import { RespositorioService } from './services/respositorio/respositorio.service';
import { RepositorioController } from './controllers/repositorio/repositorio.controller';

@Module({
  providers: [RespositorioService],
  controllers: [RepositorioController]
})
export class RepositorioModule {}
