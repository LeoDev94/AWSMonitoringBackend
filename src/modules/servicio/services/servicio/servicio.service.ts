import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import UtilsClass from 'src/utils/costs'
import { Repository } from 'typeorm';
import { ServicioEntity } from '../../entity/servicio.entity';

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(ServicioEntity)
        private servicioRepository:Repository<ServicioEntity>,
        @InjectAwsService(Pricing)
        private prc:Pricing,
     ){}

    async getServicios(id:number){
        let servicios = await this.servicioRepository.createQueryBuilder("servicio").leftJoinAndSelect("servicio.proyectos","proyecto").where('proyecto.id=:pid',{pid:id}).getMany();
        return servicios;
    }

    async getCostos(id:number){
        let servicios = await this.servicioRepository.createQueryBuilder("servicio").leftJoinAndSelect("servicio.proyectos","proyecto").where('proyecto.id=:pid',{pid:id}).getMany();
        let objservicios = servicios.map(ser=>{return ser.nombre})
        let prices:any[]=[];
        for(let serv of objservicios){
            const param = serv;
            let par = UtilsClass.getCostsParams(param);
            let data = await this.prc.getProducts(par).promise();
            let product:any = data.PriceList[0];
            const onDemand = product.terms.OnDemand;
            let key = Object.keys(onDemand)[0]
            const priceDimensions = onDemand[key].priceDimensions;
            key = Object.keys(priceDimensions)[0];
            const price = priceDimensions[key];
            prices.push({nombre:param,unidad:price.unit,description:price.description,usd:price.pricePerUnit.USD})
        }
        
        return prices;
    }

    async findAll(){
        return await this.servicioRepository.find();
    }

    async findAllinstances(){
        return await this.servicioRepository.createQueryBuilder("servicio")
        .leftJoin("servicio.proyectos","proyecto")
        .select(["servicio.id as id","servicio.nombre as nombre","COUNT(proyecto.id) as instancias"])
        .groupBy("servicio.id").addGroupBy("servicio.nombre").getRawMany();
    }
}
