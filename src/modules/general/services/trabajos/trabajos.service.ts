import { Injectable } from '@nestjs/common';
import {Cron} from '@nestjs/schedule'
import { CloudWatchLogs } from 'aws-sdk';
import {ErrorDto} from 'src/models/error/error.dto'
import { InjectAwsService } from 'nest-aws-sdk';
import { ErrorService } from 'src/modules/errores/services/error/error.service';
import { ProyectoService } from 'src/modules/proyecto/services/proyecto/proyecto.service';
import { ErrorEntity } from 'src/modules/errores/entity/error.entity';

@Injectable()
export class TrabajosService {
    
    constructor(
        private proyectoService:ProyectoService,
        private erroresService:ErrorService,
        @InjectAwsService(CloudWatchLogs)
        private cwl: CloudWatchLogs
        ){}
        
        //@Cron('0 */5 * * * *')
        async leerLog(){
            /*let proyectos = await this.proyectoService.findAll();
            proyectos.forEach((pro)=>{
                const instances = pro.instances;
                if(instances){
                    instances.forEach(async (inst)=>{
                        const params = {
                            logGroupName:'codedeploy-deployments-log',
                            logStreamName:`${inst}-codedeploy-deployments-log`,
                            limit:50
                        }
                        await this.cwl.getLogEvents(params).promise().then((data)=>{
                            if(!pro.errores){
                                pro.errores = []
                            }
                            data.events.forEach((evt)=>{
                                let nuevoLog = new ErrorEntity();
                                nuevoLog.mensaje = evt.message;
                                nuevoLog.horaOcurrencia = new Date(evt.timestamp);
                                nuevoLog.horaObtenido = new Date(evt.ingestionTime)
                                
                                pro.errores.push(nuevoLog)
                            });
                        });
                    });
                    
                    this.proyectoService.saveProyecto(pro)
                }
            })
            
            */
        }
        
    }
