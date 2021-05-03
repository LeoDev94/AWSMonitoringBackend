import { Controller, Get, Param } from '@nestjs/common';
import { ErrorService } from '../../services/error/error.service';

@Controller('logs')
export class ErrorController {
    constructor(private errorService:ErrorService){}

    @Get()
    async getAll(){
        return {
            result:'ok',
            data: await this.errorService.findAll()
        }
    }

    @Get(':id')
    async getOne(@Param('id') id:number){
        return {
            result: 'ok',
            data: await this.errorService.findByProject(id)
        }
    }

}
