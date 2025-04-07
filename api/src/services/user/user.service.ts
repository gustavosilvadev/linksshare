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

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
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

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}