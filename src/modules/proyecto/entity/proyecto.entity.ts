import { ErrorEntity } from "src/modules/errores/entity/error.entity";
import { RepositorioEntity } from "src/modules/repositorio/entity/repositorio.entity";
import { ServicioEntity } from "src/modules/servicio/entity/servicio.entity";
import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm"

@Entity("Proyecto")
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    estado:string;

    @Column()
    codigo:string;

    @Column("varchar",{name:"project_managers",array:true})
    managers:string[];

    @Column({name:'ultimo_despliegue',type:'timestamptz',nullable:true})
    ultimoDespliegue:Date;

    @Column({name: 'primer_despliegue',type:'timestamptz',nullable:true})
    primerDespliegue:Date;

    @Column({nullable:true})
    tecnologia:string;

    @Column({nullable:true})
    tipo:string;

    @OneToMany(()=>ErrorEntity,error=>error.proyecto,{cascade:true})
    errores:ErrorEntity[]

    @OneToMany(()=>RepositorioEntity,repositorio=>repositorio.proyecto,{cascade:true})
    repositorios:RepositorioEntity[];
}
