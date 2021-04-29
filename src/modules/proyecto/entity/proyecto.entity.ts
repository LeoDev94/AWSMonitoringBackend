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

    @Column()
    repositorio:string;

    @Column("varchar",{name:"project_managers",array:true,nullable:true})
    managers:string[];

    @Column({name:'ultimo_despliegue',type:'date'})
    ultimoDespliegue:string;

    @Column({name: 'primer_despliegue',type:'date'})
    primerDespliegue:string;

    @Column()
    tecnologia:string;

    @Column()
    tipo:string;
}
