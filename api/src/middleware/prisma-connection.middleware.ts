import { Injectable, NestMiddleware, ServiceUnavailableException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class PrismaConnectionMiddleware implements NestMiddleware {
    constructor(private prisma: PrismaService) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            next();
        } catch (error) {
            throw new ServiceUnavailableException('Data base unavailable!');
        }
    }
}