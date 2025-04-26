import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { validate as isUuid} from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ 
        data: {
          name:createUserDto.name,
          lastName:createUserDto.lastName,
          email:createUserDto.email,
          userName:createUserDto.userName,
          userType:createUserDto.userType
        }
      });  
    
    } catch (error) {
      
        throw new InternalServerErrorException('Erro ao criar usuário: ', error);

    }
    
  }

  async findAll() {
    try {
      const allRecords =  await this.prisma.user.findMany();
      return allRecords;
      
    } catch (error) {
      console.error(`Erro ao buscar registros da tabela User:`, error);
      return [];
    }
  }

  async findOne(id: string) {
    try {
      if (!isUuid(id)) {
        throw new NotFoundException(`ID '${id}' is not valid UUID`);
      }

      const user = await this.prisma.user.findUnique({ where: { id } });
      
      if (!user) {
        throw new NotFoundException(`No links found for user with ID '${id}'`);
      }

      return user;
      
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('UUID')
      ) {
        throw new NotFoundException(`Invalid UUID: '${id}'`);
      }

      throw error;
    }
  }
  async findByUserName(userName: string) {
    return await this.prisma.user.findFirst({ where: { userName:userName } })
  }

  findUserIdEmail(userName: string, emailUser: string) {
    return this.prisma.user.findMany({ 
      where: { 
        OR: [
            { email : emailUser },
            { userName: userName }
        ]
      } 
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateKeyId(userId: string, apiKey: string ) {
    return await this.prisma.userAccess.update({
      where: { userId: userId },
      data: { apiKey: apiKey } 
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}