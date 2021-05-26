import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositorioDto } from 'src/models/repositorios/repositorio.dto';
import { ServicioService } from 'src/modules/servicio/services/servicio/servicio.service';
import UtilsClass from 'src/utils/costs';
import { Repository } from 'typeorm';
import { RepositorioEntity } from '../../entity/repositorio.entity';

@Injectable()
export class RespositorioService {
    constructor(
        @InjectRepository(RepositorioEntity)
        private repoReposoitory: Repository<RepositorioEntity>,
        private servicioService:ServicioService
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


}
