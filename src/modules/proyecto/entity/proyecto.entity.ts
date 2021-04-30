import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

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

    @Column({nullable:true})
    repositorio:string;

    @Column("varchar",{name:"project_managers",array:true})
    managers:string[];

    @Column({name:'ultimo_despliegue',type:'date',nullable:true})
    ultimoDespliegue:string;

    @Column({name: 'primer_despliegue',type:'date',nullable:true})
    primerDespliegue:string;

    @Column({nullable:true})
    tecnologia:string;

    @Column({nullable:true})
    tipo:string;

    @Column("varchar",{nullable:true,array:true})
    instances:string[];
}
