import { ProyectoEntity } from "src/modules/proyecto/entity/proyecto.entity";
import { RepositorioEntity } from "src/modules/repositorio/entity/repositorio.entity";
import { ServicioEntity } from "src/modules/servicio/entity/servicio.entity";

export default class UtilsClass{
    
    static getCostsParams(service:string){
        if(service==="EC2"){
            return {
                Filters:[
                    {
                        Field:'ServiceCode',
                        Type:'TERM_MATCH',
                        Value:'AmazonEC2'
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "InstanceType",
                        Value: "t2.micro"
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "Location",
                        Value: "US East (Ohio)"
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "operatingSystem",
                        Value: "Linux"
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "preInstalledSw",
                        Value: "NA"
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "capacitystatus",
                        Value: "Used"
                    }
                ],
                ServiceCode:'AmazonEC2'
            }
        }
        if(service==='S3'){
            return {
                Filters:[{
                    Field:'ServiceCode',
                    Type:'TERM_MATCH',
                    Value:'AmazonS3'
                },
                {
                    Type: "TERM_MATCH",
                    Field: "Location",
                    Value: "US East (Ohio)"
                },
                {
                    Type: "TERM_MATCH",
                    Field: "VolumeType",
                    Value: "Standard"
                }],
                ServiceCode:'AmazonS3'
            }
        }
        if(service==='CodePipeline'){
            return  {
                Filters:[
                    {
                        Field:'ServiceCode',
                        Type:'TERM_MATCH',
                        Value:'AWSCodePipeline'
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "Location",
                        Value: "US East (Ohio)"
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "usagetype",
                        Value:'USE2-activePipeline'
                    }
                ],
                ServiceCode:'AWSCodePipeline'
            }
        }
        if(service==='CodeDeploy'){
            return  {
                Filters:[
                    {
                        Field:'ServiceCode',
                        Type:'TERM_MATCH',
                        Value:'AWSCodeDeploy'
                    },
                    {
                        Type: "TERM_MATCH",
                        Field: "Location",
                        Value: "US East (Ohio)"
                    }
                ],
                ServiceCode:'AWSCodeDeploy'
            }
        }
    }
    
    static getTimeFrame(timeframe:string){
        let inicio = new Date();
        let fin = new Date();
        if(timeframe==='lastHora'){
            inicio.setHours(inicio.getHours()-1);
        }
        if(timeframe==='lastDia'){
            inicio.setTime(inicio.getTime()-(1000*3600*24))
        }
        if(timeframe==='lastSemana'){
            inicio.setTime(inicio.getTime()-(1000*3600*24*7))
        }
        if(timeframe==='lastMes'){
            inicio.setTime(inicio.getTime()-(1000*3600*24*7*30))
        }
        return {inicio:inicio,fin:fin}
    }

    static deployProject(repo:RepositorioEntity,services:ServicioEntity[]):RepositorioEntity{
        repo.instancia = 'i-03548990d880b8c8d'
        repo.servicios=services;
        repo.ultimoDespliegue = new Date();
        return repo;
    }
} 