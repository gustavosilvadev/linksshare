import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LogPageViewInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const ipAddress = this.getIpAddress(request);
    const pageUrl = request.url; 

    const noProtocol  = pageUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
    const paramName   = noProtocol.split('/');
    const checkUserProfile = await this.prisma.user.findFirst({ where: { userName: paramName[1] } });

    if(!checkUserProfile){
      const checkLink = await this.prisma.link.findFirst({where: { hrefShortener: paramName[1] }});

      if(!checkLink) {
        throw new NotFoundException(`Page not found`);
      }
    }

    if (ipAddress) {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const existingView = await this.prisma.logPageView.findFirst({
            where: {
              ipAddress,
              pageUrl,
              accessedAt: {
                gte: today,
                lt: tomorrow,
              },
            },
          });

        if (!existingView) {
            await this.prisma.logPageView.create({
            data: {
                ipAddress,
                pageUrl,
                accessedAt: new Date(),
            },
            });
        }
        console.log(`Acesso registrado para IP: ${ipAddress} na página: ${pageUrl}.`);

      } catch (error) {
        console.error('Erro ao registrar acesso:', error);
      }
    }

    return next.handle();
  }

  private getIpAddress(request: Request): string | null | undefined {
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor && typeof forwardedFor === 'string') {

      return forwardedFor.split(',')[0].trim();
    }
    return request.ip;
  }
}