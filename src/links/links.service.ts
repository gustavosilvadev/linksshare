import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class LinksService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async create(data: any) {
        return await this.prisma.link.create({
            // data: {
                // userId:data.userId,
                // name:data.name,
                // href:data.href,
                // description:data.description,
                // viewStatus:  data.viewStatus,
                // positionLink:data.positionLink,
                // previewAfterClick:data.previewAfterClick,
            // }
            data

        });

    }

    async findAll() {
        return await this.prisma.link.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.link.findUnique({
            where: { id }
        })
    }

    async update(id: string, data: any) {
        return this.prisma.link.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.link.delete({
            where: { id }
        })
    }
}
