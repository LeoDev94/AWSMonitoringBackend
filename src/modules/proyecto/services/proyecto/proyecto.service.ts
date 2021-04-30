import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoDto } from 'src/models/proyecto/proyecto-dto';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../../entity/proyecto.entity';
import { CloudWatch } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private proyectoRepository: Repository<ProyectoEntity>,
        @InjectAwsService(CloudWatch)
        private cw:CloudWatch
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
    async deleteProyecto(id:number):Promise<any>{
        return await this.proyectoRepository.delete(id)
        .then(
            ()=>{
                return {deleted:true,message:'Success'}
            }
        ).catch(
            (error)=>{
                return {deleted:false,message:error}
            }
        );
    }

    async getMetricas(id:number){
        let proyeto = await this.proyectoRepository.findOne(id);
        let instancias = proyeto.instances;
        let params = {
            Dimensions: instancias.map((instancia)=>{
                return {
                    Name:'InstanceId',
                    Value: instancia
                }
            }),
        };
        const resp = await this.cw.listMetrics(params).promise()
        return resp.Metrics.map(metric=>metric.MetricName);
    }
}
