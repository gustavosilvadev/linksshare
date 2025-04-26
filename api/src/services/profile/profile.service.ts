import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}
  
    async findLinksByUserName(userName : string) 
    {
        try {
            if (!userName) {
                throw new NotFoundException(`'${userName}' is not valid`);
            }

            const user = await this.prisma.user.findFirst({ where: { userName: userName } });
            
            if (!user) {
                throw new NotFoundException(`Usuário não encontrado`);
            }
            const links = await this.prisma.link.findMany({ where: { userId: user.id } });
            return links;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new NotFoundException(`UserName inválido: '${userName}'`);
            }
    
            throw error;
        }
    }
}
