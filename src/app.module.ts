import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { ErroresModule } from './modules/errores/errores.module';
import { DatabaseModule } from './modules/database/database.module';
import { AwsSdkModule } from 'nest-aws-sdk'
import {CONFIG} from './conf/app.config'
import { CloudWatch,CloudWatchLogs,Pricing } from 'aws-sdk'
import {ScheduleModule} from '@nestjs/schedule'
import { TrabajosService } from './modules/general/services/trabajos/trabajos.service';
import { GeneralModule } from './modules/general/general.module';
import { ServicioModule } from './modules/servicio/servicio.module';
import { RepositorioModule } from './modules/repositorio/repositorio.module';


@Module({
  imports: [
    ProyectoModule,
    ErroresModule,
    DatabaseModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions:{
        accessKeyId: CONFIG.accessKey ,
        secretAccessKey: CONFIG.secretKey ,
        region: "us-east-2",
      },
      services:[CloudWatch,CloudWatchLogs,{service:Pricing,serviceOptions:{
        accessKeyId: CONFIG.accessKey ,
        secretAccessKey: CONFIG.secretKey ,
        region: "us-east-1",
      }}]
    }),
    ScheduleModule.forRoot(),
    GeneralModule,
    ServicioModule,
    RepositorioModule
  ],
    controllers: [AppController],
    providers: [AppService, TrabajosService],
  })
  export class AppModule {}
