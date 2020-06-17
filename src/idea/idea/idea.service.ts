import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IdeaEntity } from 'src/idee/idee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from '../idea.dto';

@Injectable()
export class IdeaService {

    constructor(@InjectRepository(IdeaEntity) private idearRepository:Repository<IdeaEntity>){}

    async showAll(){
        return await this.idearRepository.find();
    }

    async create(idee:IdeaDTO){
        const idea = await this.idearRepository.create(idee);
        await this.idearRepository.save(idea);
        return idea;
    }

    async read(id: string){
        return await this.idearRepository.findOne({where: {id}});
    }
    async update(id: string, idee:Partial<IdeaDTO>){
         await this.idearRepository.update({id},idee);
         return await this.idearRepository.findOne({id});
    }

    async destroy(id:string){
         await this.idearRepository.delete({id});
         return {deleted:true};
    }
}
