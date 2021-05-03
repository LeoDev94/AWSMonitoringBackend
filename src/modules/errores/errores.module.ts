import { Module } from '@nestjs/common';
import { ErrorService } from './services/error/error.service';
import { ErrorController } from './controller/error/error.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorEntity } from './entity/error.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ErrorEntity])],
  providers: [ErrorService],
  controllers: [ErrorController],
  exports:[ErrorService]
})
export class ErroresModule {}
