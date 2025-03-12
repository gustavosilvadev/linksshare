import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClicksLinkService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(addressIp: any, linkId: string) {
        return await this.prisma.clickLink.create({
            data: {
                linkId: linkId,
                addressIp: addressIp 
            }
        });
    }

    async findOne(id: string) {
        return await this.prisma.clickLink.findUnique({
            where: { id }
        });
    }

    async findAllByIdLink(linkId: string) {
        // return await this.prisma.clickLink.findMany({
        //     where: { linkId : linkId}
            
        // });
        return await this.prisma.clickLink.groupBy({
            by: ['addressIp'], 
            where: { linkId : linkId }
        });
    }

    // async findAll(){
    //     return await this.prisma.clickLink.findMany();
    // }

    // async update(id: string, data: any) {
    //     return this.prisma.clickLink.update({
    //         where: { id },
    //         data,
    //     });
    // }

    // async remove(id: string) {
    //     return this.prisma.clickLink.delete({
    //         where: { id }
    //     })
    // }

}
