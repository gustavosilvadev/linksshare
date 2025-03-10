import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly authService:AuthService
    ) {}

    async create(data: any) {
        const savedUser =  await this.prisma.user.create({
            data: {
                name: data.name,
                lastName: data.lastName,
                email: data.lastName,
                userType: data.userType,
                userName: data.userName
            }

        });

        const savedUserAccess =  await this.prisma.userAccess.create({
            data: {
                userId: savedUser.id,
                password: await this.authService.hashPassword(data.password),
                userAdmin: data.userAdmin,
                status: true

            }
        });

        return (savedUserAccess) ? savedUser : '';
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async update(id: string, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.user.delete({
            where: { id }
        })
    }
}
