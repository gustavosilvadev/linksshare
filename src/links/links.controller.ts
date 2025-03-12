import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
    constructor(
        private readonly linksService: LinksService
    ){}

    @Post()
    create(@Body() createLinkDto: any) {
        return this.linksService.create(createLinkDto);
    }

    @Get()
    findAll() {
        return this.linksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.linksService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateLinkDto: any) {
        return this.linksService.update(id, updateLinkDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.linksService.remove(id);
    }
}
