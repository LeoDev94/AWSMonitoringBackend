import { RepositorioEntity } from "src/modules/repositorio/entity/repositorio.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Servicio')
export class ServicioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToMany(()=>RepositorioEntity,repositorio=>repositorio.servicios,{cascade:true})
    @JoinTable()
    repositorios:RepositorioEntity[]
}
