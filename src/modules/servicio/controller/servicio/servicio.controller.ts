import { Controller, Get, Param } from '@nestjs/common';
import { ServicioService } from '../../services/servicio/servicio.service';

@Controller('servicios')
export class ServicioController {
    constructor(private servicioService:ServicioService){}

    @Get('proyecto/:id')
    async getServicios(@Param('id') id:number){
        return {
            result:'ok',
            data: (await this.servicioService.getServicios(id)).map(serv=>{return {id:serv.id,nombre:serv.nombre}})
        }
    }
    @Get('proyecto/:id/costos')
    async getCostos(@Param('id') id:number){
        return {
            result:'ok',
            data: await this.servicioService.getCostos(id)
        }
    }
}
