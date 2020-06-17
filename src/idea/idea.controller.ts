import { IdeaService } from './idea/idea.service';

import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { IdeaDTO } from './idea.dto';

@Controller('idea')
export class IdeaController {

    constructor(private ideaService:IdeaService){}
    @Get()
    showAllIdeas(){
        return this.ideaService.showAll();
    }

    @Post()
    createIdea(@Body() idee:IdeaDTO){
        return this.ideaService.create(idee);
    }

    @Get(':id')
    readIdea(@Param( 'id') myId:string){
        return this.ideaService.read(myId);
    }

    @Put(':id')
    updateIdea(@Param( 'id') myId:string, @Body() idee:Partial<IdeaDTO>){
        return this.ideaService.update(myId,idee)
    }

    @Delete(':id')
    destroyIdea(@Param( 'id') myId:string){
        return this.ideaService.destroy(myId);
    }
}
