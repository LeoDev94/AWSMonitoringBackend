import { Controller, Get } from '@nestjs/common';
import { TrabajosService } from '../../services/trabajos/trabajos.service';

@Controller('general')
export class GeneralController {
    constructor(private trabajosService:TrabajosService){}

    /*
    TODO: Imporve this to get logs in bulk
    @Get()
    async getLogs(){
        await this.trabajosService.leerLog();
        return {
            result:'ok'
        }
    }*/
}
