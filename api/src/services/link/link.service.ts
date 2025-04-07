
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLinkDto } from 'src/dto/link/create-link.dto';
import { UpdateLinkDto } from 'src/dto/link/update-link.dto';

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

  findAllLinksByUser(idUser: string) {
    return this.prisma.link.findMany({ 
        where: { 
            user: {
                id: idUser
            }
        }
    });
  }

  findOne(id: string) {
    return this.prisma.link.findUnique({ where: { id } });
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

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  remove(id: string) {
    return this.prisma.link.delete({ where: { id } });
  }
}