import { Controller, Param, Body, Post, Get, Put, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClicksLinkService } from './clicks_link.service';

@Controller('click-access')
export class ClicksLinkController {
    constructor(private readonly clicksLinkService: ClicksLinkService) {}

    @Post('reg/:linkId')
    registerClick(@Param('linkId') linkId:string, @Req() req: Request) {
        const ipAddress = req.ip;
        return this.clicksLinkService.create(ipAddress, linkId);
    }

    
    @Get('showcliks/:linkId')
    getAllRegByIdLink(@Param('linkId') linkId: string) {
        return this.clicksLinkService.findAllByIdLink(linkId);
    }
    
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.clicksLinkService.findOne(id);
    // }

    // @Get()
    // findAll() {
    //     return this.clicksLinkService.findAll();
    // }
    
    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateLinkDto: any) {
    //     return this.clicksLinkService.update(id, updateLinkDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.clicksLinkService.remove(id);
    // }

}
