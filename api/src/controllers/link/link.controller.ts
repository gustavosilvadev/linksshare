import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpCode, NotFoundException } from '@nestjs/common';
import { LinkService } from 'src/services/link/link.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';

import { ApiKeyAuthGuards } from 'src/services/auth/guards/api-key-auth.guard';
import { Request as ExpressRequest } from 'express';

interface LinkProcessingResult {
  message: string;
  responseLinkService?: any; 
  href?: string; 
  name?: string;
}

interface SuccessResponse {
  message: string;
  results: LinkProcessingResult[];
}

interface ErrorResponse {
  message: string;
}

type CreateLinkResponse = SuccessResponse | ErrorResponse;
type UpdateLinkResponse = SuccessResponse | ErrorResponse;

@Controller('link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,

) {}

// Teste 0001 >>>>>>>>>>>>>>>>>>>>>>
  @UseGuards(ApiKeyAuthGuards)
  @Get('resource')
  getResource(@Request() req: ExpressRequest) {
    return { message: 'Recurso protegido acessado!', user: req['user'] };
  }
// Teste 0001 >>>>>>>>>>>>>>>>>>>>>>

  @Post(':idUser')
  @HttpCode(200)
  async create(
    @Param('idUser') idUser: string, 
    @Body() createLinkDtos: CreateLinkDto[]
  ): Promise<CreateLinkResponse>  {
    
    if (!createLinkDtos || !Array.isArray(createLinkDtos)) {
      return { message: 'Nenhum link fornecido para criar.' };
    }

    const results: LinkProcessingResult[] = await Promise.all(
      createLinkDtos.map(async (createLinkDto) => {
        const checkLink = await this.linkService.findLinkHrefName(
          createLinkDto.href,
          createLinkDto.name,
        );

        if (!checkLink.length) {
          const responseLinkService = await this.linkService.create(idUser, createLinkDto);
          return { message: 'Link criado com sucesso!', responseLinkService };
        } else {
          return { message: 'Link já cadastrado!', href: createLinkDto.href, name: createLinkDto.name };
        }
      }),
    );

    return { message: 'Processamento concluído!', results };

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
  async update(
    @Param('idUser') idUser: string, 
    @Body() updateLinkDtos: UpdateLinkDto[]
  ): Promise<UpdateLinkResponse>  {
    
    if (!updateLinkDtos || !Array.isArray(updateLinkDtos)) {
      return { message: 'Nenhum link fornecido para atualizar.' };
    }

    const results: LinkProcessingResult[] = await Promise.all(
      updateLinkDtos.map(async (updateLinkDto) => {
        let checkLinkExists = await this.linkService.findOne(updateLinkDto.id);

        if(checkLinkExists) {
          const responseLinkService = await this.linkService.update(updateLinkDto);
          return { message: 'Link atualizado com sucesso!', responseLinkService };
        }else{

          return { message: 'Link não encontrado!', checkLinkExists};
        }
        
      }),
    );

    return {message: 'Atualizado com sucesso!', results};
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}