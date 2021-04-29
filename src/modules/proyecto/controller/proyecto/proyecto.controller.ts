import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

    @Put(':id')
    async updateProyecto(@Param('id') id:number,@Body() data:Partial<ProyectoDto>){
        return {
            result: 'ok',
            data: await this.proyectoService.updateProyecto(id,data)
        }
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
}