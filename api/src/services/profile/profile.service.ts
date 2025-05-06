import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}
  
    async findPageByNameParam(paramName : string) 
    {
        try {
            const user = await this.prisma.user.findFirst({ where: { userName: paramName } });
            
            if (!user) {

                const addressLink = await this.prisma.link.findFirst({ where: { hrefShortener: paramName} });
                
                if(!addressLink){
                    throw new NotFoundException(`Page not found`);
                }else {

                    return addressLink.href;
                }
            }else{
                const links = await this.prisma.link.findMany({ where: { userId: user.id, viewStatus: true } });
                return links;
            }

            
        } catch (error) {
            if (error instanceof Error) {
                throw new NotFoundException(`Invalid Address : '${paramName}'`);
            }
    
            throw error;
        }
    }
}
