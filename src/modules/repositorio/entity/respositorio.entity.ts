import { ProyectoEntity } from "src/modules/proyecto/entity/proyecto.entity";
import { ServicioEntity } from "src/modules/servicio/entity/servicio.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('repositorio')
export class RespositorioEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    instancia:string;

    @Column()
    primerDespliegue:Date

    @Column()
    ultimoDespliegue:Date

   /* @ManyToOne(()=>ProyectoEntity,proyecto=>)
    proyecto:ProyectoEntity

    @ManyToMany()
    servicios:ServicioEntity[]*/

}
