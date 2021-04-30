import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { ErroresModule } from './modules/errores/errores.module';
import { DatabaseModule } from './modules/database/database.module';
import { AwsSdkModule } from 'nest-aws-sdk'
import {CONFIG} from './conf/app.config'
import { CloudWatch } from 'aws-sdk'

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
      services:[CloudWatch]
    })
  ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
