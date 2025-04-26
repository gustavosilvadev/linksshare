
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';
import { validate as isUuid} from 'uuid';
@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async create(id: string,createLinkDto: CreateLinkDto) {
    try {
      return await this.prisma.link.create({ 
        data: {

            name:createLinkDto.name,
            href:createLinkDto.href,
            description:createLinkDto.description,
            viewStatus:createLinkDto.viewStatus,
            positionLink:createLinkDto.positionLink,
            previewBeforeClick:createLinkDto.previewBeforeClick,
            userId: id
        }
      });  
    
    } catch (error) {
      
        throw new InternalServerErrorException('Erro ao criar link: ', error);
    }
  }

  async findAllLinksByUser(idUser: string) {
    try {
      if (!isUuid(idUser)) {
        throw new NotFoundException(`ID '${idUser}' is not valid UUID`);
      }

      const resultLinks = await this.prisma.link.findMany({ 
        where: { 
          userId: idUser
        }
      });

      if (!resultLinks || resultLinks.length === 0) {
        throw new NotFoundException(`No links found for user with ID '${idUser}'`);
      }

      return resultLinks;
      
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('UUID')
      ) {
        throw new NotFoundException(`Invalid UUID: '${idUser}'`);
      }

      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.link.findUnique({ where: { id } });
      
    } catch (error) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
        error: error
      });
    }
  }

  findLinkHrefName(href: string, name: string) {
    return this.prisma.link.findMany({ 
      where: { 
        OR: [
            { href : href },
            { name: name }
        ]
      } 
    });
  }

  update(updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id : updateLinkDto.id },
      data: updateLinkDto
    })

  }

  remove(id: string) {
    return this.prisma.link.delete({ where: { id } });
  }
}