import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { ErrorEntity } from '../errores/entity/error.entity';
import { ErroresModule } from '../errores/errores.module';
import { ProyectoEntity } from '../proyecto/entity/proyecto.entity';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { ServicioEntity } from '../servicio/entity/servicio.entity';
import { ServicioModule } from '../servicio/servicio.module';


@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:"postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "awsm_db",
            entities: [ProyectoEntity,ErrorEntity,ServicioEntity],
            synchronize: true
        }),
        ProyectoModule,
        ErroresModule,
        ServicioModule
    ]
})
export class DatabaseModule {
    constructor(private readonly connection:Connection){}
}
