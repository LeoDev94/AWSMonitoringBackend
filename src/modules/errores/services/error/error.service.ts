import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorDto } from 'src/models/error/error.dto';
import { Repository } from 'typeorm';
import { ErrorEntity } from '../../entity/error.entity';

@Injectable()
export class ErrorService {
    constructor(
        @InjectRepository(ErrorEntity)
        private errorRepository:Repository<ErrorEntity>
    ){}

    async findAll(){
        return await this.errorRepository.find();
    }

    async findByProject(id:number){
        let logs = await this.errorRepository.find({relations:['proyecto'],where:{proyecto:{id:id}}});
        return logs.map((errlog)=>{
            return {
                id: errlog.id,
                mensaje:errlog.mensaje,
                horaOcurrencia:errlog.horaOcurrencia,
                horaObtenido:errlog.horaObtenido
            }
        })
    }

    async addLogs(log:ErrorDto){
        const errorlog = this.errorRepository.create(log);
        await this.errorRepository.save(log);
        return errorlog;
    }
}
