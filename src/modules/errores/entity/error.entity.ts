import { ProyectoEntity } from "src/modules/proyecto/entity/proyecto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Error_log')
export class ErrorEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    mensaje:string;

    @Column({name:'hora_ocurrencia',type:'timestamptz'})
    horaOcurrencia:Date;

    @Column({name:'hora_obtenido',type:'timestamptz'})
    horaObtenido:Date;

    @ManyToOne(()=>ProyectoEntity,proyecto=>proyecto.errores,{onDelete:'CASCADE'})
    proyecto:ProyectoEntity

}
