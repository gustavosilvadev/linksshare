import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';


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

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
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

  async updateKeyId(userId: string, apiKey: any ) {

    return await this.prisma.userAccess.update({
      where: { userId: userId },
      data: { apiKey: apiKey }
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}