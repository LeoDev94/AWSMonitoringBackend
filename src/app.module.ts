import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { ErroresModule } from './modules/errores/errores.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ProyectoModule, ErroresModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
