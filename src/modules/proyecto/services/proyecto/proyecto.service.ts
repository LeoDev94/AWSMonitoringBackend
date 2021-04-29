import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoDto } from 'src/models/proyecto/proyecto-dto';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../../entity/proyecto.entity';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private proyectoRepository: Repository<ProyectoEntity>
    ){}

    async findAll(){
        return this.proyectoRepository.find();
    }

    async findOne(id:number){
        return await this.proyectoRepository.findOne(id);
    }

    async updateProyecto(id:number,data:Partial<ProyectoDto>){
        await this.proyectoRepository.update(id,data)
        return await this.proyectoRepository.findOne(id);
    }

    async createProyecto(data:ProyectoDto){
        const proyecto = this.proyectoRepository.create(data);
        await this.proyectoRepository.save(data);
        return proyecto;
    }
}
