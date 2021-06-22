import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RepositorioDto } from 'src/models/repositorios/repositorio.dto';
import { RespositorioService } from '../../services/respositorio/respositorio.service';

@Controller('repositorios')
export class RepositorioController {
    constructor(private repositorioService: RespositorioService){}

    @Post()
    async createRepositorio(@Body() data: RepositorioDto){
        return {
            result:'ok',
            data:await this.repositorioService.createRepo(data)
        };
    }

    @Get(':id/desplegar')
    async desplegarRepo(@Param('id') id:number){
        return {
            result:'ok',
            data:await this.repositorioService.desplegarRepositorio(id)
        };
    }

    @Get(':id/metricas')
    async listMetricas(@Param('id') id:number){
        return {
            result:'ok',
            data:await this.repositorioService.getMetricas(id)
        };
    }

    @Get(':id/metricas/:metric')
    async getMetricData(@Param('id') id:number,@Param('metric') metric:string,@Query('timeframe') timeframe:string){
        return {
            result:'ok',
            data: await this.repositorioService.getMetricData(id,metric,timeframe)
        }
    }

    @Get(':id/logs')
    async getLogs(@Param('id') id:number){
        return {
            result:'ok',
            data: await this.repositorioService.getLogs(id)
        };
    }

    @Get(':id')
    async getRespositorio(@Param('id') id:number){
        return {
            result:'ok',
            data:await this.repositorioService.findOne(id)
        };
    }

    @Put(':id')
    async editarRepositorio(@Param('id') id:number,@Body() data:Partial<RepositorioDto>){
        return {
            result:'ok',
            data:await this.repositorioService.updateRepo(id,data)
        }
    }

}
