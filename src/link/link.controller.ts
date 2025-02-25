import { Controller, Body, Post, Get } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto/create-link.dto';

@Controller('link')
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @Post('/save')
    create(@Body() createLinkDto: CreateLinkDto) {
        console.log(createLinkDto);
        return this.linkService.create(createLinkDto);
    }

}
