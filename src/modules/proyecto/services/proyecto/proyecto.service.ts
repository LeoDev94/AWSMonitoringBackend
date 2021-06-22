import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoDto } from 'src/models/proyecto/proyecto-dto';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../../entity/proyecto.entity';
import { CloudWatch,CloudWatchLogs } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk';
import UtilsClass from 'src/utils/costs';
import { ServicioService } from 'src/modules/servicio/services/servicio/servicio.service';
import { RepositorioEntity } from 'src/modules/repositorio/entity/repositorio.entity';
import { RepositorioDto } from 'src/models/repositorios/repositorio.dto';
import { RespositorioService } from 'src/modules/repositorio/services/respositorio/respositorio.service';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private proyectoRepository: Repository<ProyectoEntity>,
        @InjectRepository(RepositorioEntity)
        private repoRepository: Repository<RepositorioEntity>,
        @InjectAwsService(CloudWatch)
        private cw:CloudWatch,
        @InjectAwsService(CloudWatchLogs)
        private cwl:CloudWatchLogs,
        private servicioService: ServicioService,
        private reposService:RespositorioService
    ){}

    async findAll(){
        return this.proyectoRepository.find({relations:['repositorios']});
    }

    async findOne(id:number){
        return await this.proyectoRepository.findOne(id);
    }

    async updateProyecto(id:number,data:Partial<ProyectoDto>){
        await this.proyectoRepository.update(id,data)
        return await this.proyectoRepository.findOne(id);
    }

    async saveProyecto(proyecto:ProyectoEntity){
        await this.proyectoRepository.save(proyecto);
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
        let repos = await this.getRepositorios(id);
        let metricas = []
        for(let rep of repos){
            let met = await this.reposService.getMetricas(rep.id);
            let dat = {
                id:rep.id,
                data:met
            };
            metricas.push(dat);
        }
        return metricas;
    }

   /* async getMetricData(id:number,metric:string,timeframe:string){
        let proyecto = await this.proyectoRepository.findOne(id);
        const instances = proyecto.instances;
        const to = UtilsClass.getTimeFrame(timeframe);
        let dateNow = to.fin;
        let dateBefore = to.inicio;

        //dateBefore.setHours(dateBefore.getHours()-1);
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

    }*/
    /*async getLogs(id:number,idRepo:number){
        let proyecto = await this.proyectoRepository.findOne(id);
        const instances = proyecto.instances;
        let logs = [];
        if(instances){
            for(const inst of instances){
                const params = {
                    logGroupName:'codedeploy-deployments-log',
                    logStreamName:`${inst}-codedeploy-deployments-log`,
                    limit:50
                }
                let data = await this.cwl.getLogEvents(params).promise();
                let logErr={};
                for(const evt of data.events){
                    logErr = {
                        mensaje:evt.message,
                        horaOcurrencia: new Date(evt.timestamp),
                        horaGuardado: new Date(evt.ingestionTime)
                    }
                    logs.push(logErr);
                };
            };
        }
        return logs;
    }*/

    async getRepositorios(id:number){
        let proyecto = await this.proyectoRepository.findOne(id,{relations:['repositorios']});
        let repos = proyecto.repositorios;
        return repos;
    }

    async getDesplegados(){
        let desplegados = await this.proyectoRepository.createQueryBuilder("proyecto").select(
            `SUM(CASE WHEN proyecto.ultimoDespliegue is null THEN 0 else 1 END)`,"desplegados"
        ).addSelect(`
            SUM(CASE WHEN  proyecto.ultimoDespliegue is null THEN 1 else 0 END)
        `,"no_desplegados").getRawOne();
        return desplegados;
    }

    async addRepositorio(id:number,data:RepositorioDto){
        let proyecto = await this.proyectoRepository.findOne(id);
        let repo = this.repoRepository.create(data);
        if(!proyecto.repositorios){
            proyecto.repositorios = [];
        }
        proyecto.repositorios.push(repo);
        await this.proyectoRepository.save(proyecto);
        return repo;
    }

    async addRepoBulk(id:number,data:RepositorioDto[]){
        let proyecto = await this.proyectoRepository.findOne(id);
        if(!proyecto.repositorios){
            proyecto.repositorios = [];
        }
        for(const rep of data){
            let repo = this.repoRepository.create(rep);
            proyecto.repositorios.push(repo);
        }
        await this.proyectoRepository.save(proyecto);
    }

    async getCostos(id:number){
        let repos = await this.getRepositorios(id);
        let arrcostos = [];
        for(let rep of repos){
            let costos = await this.servicioService.getCostos(rep.id);
            let dato = {
                id:rep.id,
                costos:costos
            };
            arrcostos.push(dato);
        }
        return arrcostos;
    }
    /*async desplegarProyecto(id:number,idRepo:number){
        let proyecto = await this.proyectoRepository.findOne(id);
        let servicios = await this.servicioService.getServiciosDespliegue();
        let repo = proyecto.repositorios.find(pro=>pro.id==idRepo);
        repo = UtilsClass.deployProject(repo,servicios);
        
        this.proyectoRepository.save(proyecto);
        return {instancias: proyecto.instances}
    }*/
}
