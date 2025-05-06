import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserAccessDto } from 'src/dto/user/update-user-access.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAccessService {
  constructor(private prisma: PrismaService) {}

  async create(id: string, dataParams: any) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(dataParams.password, saltRounds);

      const response = await this.prisma.userAccess.create({
        data: {
          password: hashedPassword,
          userAdmin: dataParams.userAdmin,
          status: dataParams.status,
          userId: id,
        },
        include: {
          user: true,
        },
      });


      const { password: passwordHash, user, ...accessResult } = response;

      return { ...accessResult, user };

    } catch (error) {
      throw new InternalServerErrorException('Erro no registro de acesso do usuário! - ', error.message);
    }
  }

  async findByUserId(userId: string) {
    return this.prisma.userAccess.findFirst({ where: { userId } });
  }

  async findOne(id: string) {
    return this.prisma.userAccess.findUnique({ where: { id } });
  }

  async update(id: string, updateUserAccessDto: UpdateUserAccessDto) {
    return this.prisma.userAccess.update({
      where: { id },
      data: updateUserAccessDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}