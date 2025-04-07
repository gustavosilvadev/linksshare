import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
// import { CreateUserAccessDto } from 'src/dto/user/create-user-access.dto';
import { UpdateUserAccessDto } from 'src/dto/user/update-user-access.dto';


@Injectable()
export class UserAccessService {
  constructor(private prisma: PrismaService) {}

  async create(id:string, dataParams : any) {
    try {

      const response = await this.prisma.userAccess.create({ data :{
        password: dataParams.password,
        userAdmin: dataParams.userAdmin,
        status: dataParams.status,
        userId: id
      } });

      return response;

    } catch (error) {
      throw new InternalServerErrorException('Erro no registro de acesso do usuário! - ', error.message);
    }
  }


  findOne(id: string) {
    return this.prisma.userAccess.findUnique({ where: { id } });
  }

  update(id: string, updateUserAccessDto: UpdateUserAccessDto) {
    return this.prisma.userAccess.update({
      where: { id },
      data: updateUserAccessDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}