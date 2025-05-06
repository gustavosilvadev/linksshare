import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpCode, NotFoundException, Req } from '@nestjs/common';
import { AuthGuard } from 'src/services/auth/guards/auth.guard';
import { Request as ExpressRequest } from 'express';
import { LinkService } from 'src/services/link/link.service';
import { UserService } from 'src/services/user/user.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';

interface LinkProcessingResult {
  message: string;
  responseLinkService?: any;
  href?: string;
  name?: string;
  id?: string;
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
    private readonly userService: UserService

) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  async create(
    @Body() createLinkDtos: CreateLinkDto[],
    @Req() req: ExpressRequest
  ): Promise<CreateLinkResponse>  {
    const results: LinkProcessingResult[] = await Promise.all(
      createLinkDtos.map(async (createLinkDto) => {

        try {
          const checkUser = await this.userService.findOne(createLinkDto.userId);

          if (!checkUser) {
            return { message: 'Usuário não encontrado!'};
          }

          const checkLink = await this.linkService.findLinkHrefName(
            createLinkDto.href,
            createLinkDto.name,
          );

          if (!checkLink.length) {
            const responseLinkService = await this.linkService.create(createLinkDto.userId, createLinkDto);
            return { message: 'Link criado com sucesso!', responseLinkService };
          } else {
            return { message: 'Link já cadastrado!', href: createLinkDto.href, name: createLinkDto.name };
          }
        } catch (error) {
          console.error('Erro ao criar link:', error);
          return { message: 'Erro ao processar a criação do link.' };
        }
      }),
    );

    return { message: 'Processamento concluído!', results };
  }

  @UseGuards(AuthGuard)
  @Get(':idUser')
  findAll(@Param('idUser') idUser: string, @Request() req: ExpressRequest) {
    if (req['user']?.sub !== idUser) {
      throw new NotFoundException('Links não encontrados para este usuário.');
    }
    return this.linkService.findAllLinksByUser(idUser);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @Request() req: ExpressRequest
  ): Promise<UpdateLinkResponse>  {

    try {
      const existingLink = await this.linkService.findOne(id);
      if (!existingLink) {
        return { message: 'Link não encontrado!'};
      }
      
      const linkUserId = existingLink.userId; 

      if (req['user']?.sub !== linkUserId) {
        throw new NotFoundException('Você não tem permissão para atualizar este link.');
      }

      const responseLinkService = await this.linkService.update(updateLinkDto);
      return { message: 'Link atualizado com sucesso!', results: [{ message: 'Link atualizado com sucesso!', responseLinkService: { ...responseLinkService, id } }] };
    } catch (error) {
      console.error('Erro ao atualizar link:', error);
      return { message: 'Erro ao processar a atualização do link.' };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    try {
      const existingLink = await this.linkService.findOne(id);
      if (!existingLink) {
        throw new NotFoundException('Link não encontrado!');
      }

      if (req['user']?.sub !== existingLink.userId) {
        throw new NotFoundException('Você não tem permissão para excluir este link.');
      }

      await this.linkService.remove(id);
      return { message: 'Link removido com sucesso!' };
    } catch (error) {
      console.error('Erro ao remover link:', error);
      return { message: 'Erro ao processar a remoção do link.' };
    }
  }
}