import { ProyectoEntity } from "src/modules/proyecto/entity/proyecto.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Servicio')
export class ServicioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToMany(()=>ProyectoEntity,proyecto=>proyecto.servicios,{cascade:true})
    @JoinTable()
    proyectos:ProyectoEntity[]
}
