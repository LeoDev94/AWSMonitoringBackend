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
        let instancias = proyeto.instances?proyeto.instances:[];
        if(instancias.length>0){
            let params = {
                Dimensions: instancias.map((instancia)=>{
                    return {
                        Name:'InstanceId',
                        Value: instancia
                    }
                }),
            };
            const resp = await this.cw.listMetrics(params).promise();
            return resp.Metrics.map(metric=>metric.MetricName);
        }else{
            return []
        }
    }

    async getMetricData(id:number,metric:string){
        let proyecto = await this.proyectoRepository.findOne(id);
        const instances = proyecto.instances;
        let dateNow = new Date();
        let dateBefore = new Date();

        dateBefore.setHours(dateBefore.getHours()-1);
        let params:any = {
            StartTime:dateBefore,
            EndTime:dateNow,
            MetricDataQueries:[]
        };
        instances.forEach((inst,index)=>{
            const metrica = {
                Namespace:'AWS/EC2',
                MetricName: metric,
                Dimensions: [{
                    Name:'InstanceId',
                    Value: inst
                }]
            }
            const query = {
                Id:`m${index}`,
                MetricStat:{
                    Metric: metrica,
                    Period:300,
                    Stat:'Maximum'
                },
            }
            params.MetricDataQueries.push(query);
        });
        
        const resp = await this.cw.getMetricData(params).promise();
        return resp.MetricDataResults;

    }
}
