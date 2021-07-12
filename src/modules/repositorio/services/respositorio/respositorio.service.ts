import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositorioDto } from 'src/models/repositorios/repositorio.dto';
import { ServicioService } from 'src/modules/servicio/services/servicio/servicio.service';
import UtilsClass from 'src/utils/costs';
import { Repository } from 'typeorm';
import { RepositorioEntity } from '../../entity/repositorio.entity';
import { CloudWatch,CloudWatchLogs } from 'aws-sdk'
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class RespositorioService {
    constructor(
        @InjectRepository(RepositorioEntity)
        private repoReposoitory: Repository<RepositorioEntity>,
        private servicioService:ServicioService,
        @InjectAwsService(CloudWatch)
        private cw:CloudWatch,
        @InjectAwsService(CloudWatchLogs)
        private cwl:CloudWatchLogs,
    ){}

    async findAll(){
        return await this.repoReposoitory.find();
    }

    async findOne(id:number){
        return await this.repoReposoitory.findOne(id);
    }

    async createRepo(data:RepositorioDto){
        const repo = this.repoReposoitory.create(data);
        await this.repoReposoitory.save(repo);
        return repo;
    }

    async updateRepo(id:number,data:Partial<RepositorioDto>){
        await this.repoReposoitory.update(id,data);
        
        return await this.repoReposoitory.findOne(id);
    }

    async deleteRepo(id:number){
        return await this.repoReposoitory.delete(id);
    }

    async desplegarRepositorio(id:number){
        let repo = await this.repoReposoitory.findOne(id);
        let services = await this.servicioService.getServiciosDespliegue();
        repo = UtilsClass.deployProject(repo,services);
        this.repoReposoitory.save(repo);
    }

    async getMetricas(id:number){
        let repo = await this.repoReposoitory.findOne(id);
        const instancia = repo.instancia?repo.instancia:"";
        if(instancia.length > 0){
            let params = {
                Dimensions:[{
                    Name: 'InstanceId',
                    Value: instancia
                }]
            };
            const resp = await this.cw.listMetrics(params).promise();
            return resp.Metrics.map(metric=>metric.MetricName);
        }else{
            return [];
        }
    }

    async getMetricData(id:number,metric:string,timeframe:string){
        let repo = await this.repoReposoitory.findOne(id);
        const instancia = repo.instancia;
        const to = UtilsClass.getTimeFrame(timeframe);
        let dateNow = to.fin;
        let dateBefore = to.inicio;

        //dateBefore.setHours(dateBefore.getHours()-1);
        let params:any = {
            StartTime:dateBefore,
            EndTime:dateNow,
            MetricDataQueries:[]
        };
        const metrica = {
            Namespace:'AWS/EC2',
            MetricName: metric,
            Dimensions: [{
                Name:'InstanceId',
                Value: instancia
            }]
        };
        const query = {
            Id:`m${repo.id}`,
            MetricStat:{
                Metric: metrica,
                Period:300,
                Stat:'Maximum'
            },
        }
        params.MetricDataQueries.push(query);
        const resp = await this.cw.getMetricData(params).promise();
        return resp.MetricDataResults;
    }


    async getLogs(idRepo:number){
        let repo = await this.repoReposoitory.findOne(idRepo);
        //let proyecto = await this.proyectoRepository.findOne(id);
        //const instances = proyecto.instances;
        const instancia = repo.instancia
        let logs = [];
        if(instancia){
            const params = {
                logGroupName:'codedeploy-deployments-log',
                logStreamName:`${instancia}-codedeploy-deployments-log`,
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
        }
        return logs;
    }

}
