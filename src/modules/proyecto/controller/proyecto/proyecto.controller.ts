import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProyectoDto } from 'src/models/proyecto/proyecto-dto';
import { ProyectoService } from '../../services/proyecto/proyecto.service';

@Controller('proyectos')
export class ProyectoController {
    constructor(private proyectoService:ProyectoService){}

    @Post()
    async createProyecto(@Body() data:ProyectoDto){
        return {
            result:'ok',
            data: await this.proyectoService.createProyecto(data)}
    }

    @Get('desplegados')
    async getDesplegados(){
        return {
            result:'ok',
            data:await this.proyectoService.getDesplegados()
        }
    }

    /*@Put('desplegar/:id')
    async desplegarProyecto(@Param('id') id:number){
        return {
            result:'ok',
            data:await this.proyectoService.desplegarProyecto(id)
        }
    }*/

    @Put(':id')
    async updateProyecto(@Param('id') id:number,@Body() data:Partial<ProyectoDto>){
        return {
            result: 'ok',
            data: await this.proyectoService.updateProyecto(id,data)
        }
    }

    @Delete(':id')
    async deleteProyecto(@Param('id') id:number){
        return await this.proyectoService.deleteProyecto(id)
        .then((result)=>{
            return {
                result: result.deleted?'ok':'error',
                data: result.deleted
            }
        }).catch((error)=>{
            return {
                result:'error',
                data:error
            }
        });
    }

    @Get()
    async getAll(){
        return{
            result:'ok',
            data: await this.proyectoService.findAll()
        }
    }

    @Get(':id')
    async getOne(@Param('id') id:number){
        return {
            result: 'ok',
            data: await this.proyectoService.findOne(id)
        }
    }

    @Get(':id/metricas')
    async listMetricas(@Param('id') id:number){
        return {
            result:'ok',
            data: await this.proyectoService.getMetricas(id)
        }
    }

    @Get(':id/metricas/:metric')
    async getMetricData(@Param('id') id:number,@Param('metric') metric:string,@Query('timeframe') timeframe:string){
        return {
            result:'ok',
            data: await this.proyectoService.getMetricData(id,metric,timeframe)
        }
    }

    @Get(':id/logs')
    async getLogs(@Param('id') id:number){
        return {
            result:'ok',
            data: await this.proyectoService.getLogs(id)
        }
    }


}
