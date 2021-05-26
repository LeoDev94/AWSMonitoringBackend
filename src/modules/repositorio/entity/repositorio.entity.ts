import { ProyectoEntity } from "src/modules/proyecto/entity/proyecto.entity";
import { ServicioEntity } from "src/modules/servicio/entity/servicio.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('repositorio')
export class RepositorioEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column({nullable:true})
    instancia:string;

    @Column({name:"primer_despliegue",nullable:true})
    primerDespliegue:Date

    @Column({name:"ultimo_despliegue",nullable:true})
    ultimoDespliegue:Date

    @ManyToOne(()=>ProyectoEntity,proyecto=>proyecto.repositorio)
    proyecto:ProyectoEntity

    @ManyToMany(()=>ServicioEntity,servicios=>servicios.repositorios)
    servicios:ServicioEntity[]

}
