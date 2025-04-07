import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { LinkService } from 'src/services/link/link.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';

@Controller('link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,

) {}

  @Post(':idUser')
  @HttpCode(200)
  async create(@Param('idUser') idUser: string, @Body() createLinkDto: CreateLinkDto) {
    const checkLink = await this.linkService.findLinkHrefName(createLinkDto.href, createLinkDto.name);

    if(!checkLink.length) {
        const responseLinkService = await this.linkService.create(idUser, createLinkDto);
        
        return { message: 'Link criado com sucesso!', responseLinkService };
    }

    return { message: 'Link já cadastrado!' };
  }

  @Get(':idUser')
  findAll(@Param('idUser') idUser: string) {
    return this.linkService.findAllLinksByUser(idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}