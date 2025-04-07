import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { LinkService } from 'src/services/link/link.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';


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

@Controller('link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,

) {}

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
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}