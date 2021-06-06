import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
