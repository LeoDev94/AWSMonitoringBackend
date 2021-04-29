import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { ProyectoEntity } from '../proyecto/entity/proyecto.entity';
import { ProyectoModule } from '../proyecto/proyecto.module';


@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:"postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "awsm_db",
            entities: [ProyectoEntity],
            synchronize: true
        }),
        ProyectoModule
    ]
})
export class DatabaseModule {
    constructor(private readonly connection:Connection){}
}
