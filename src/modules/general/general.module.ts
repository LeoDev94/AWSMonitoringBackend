import { Module } from '@nestjs/common';
import { ErroresModule } from '../errores/errores.module';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { TrabajosService } from './services/trabajos/trabajos.service';
import { GeneralController } from './controllers/general/general.controller';

@Module({
    imports:[ProyectoModule,ErroresModule],
    providers:[TrabajosService],
    controllers: [GeneralController]
})
export class GeneralModule {}
