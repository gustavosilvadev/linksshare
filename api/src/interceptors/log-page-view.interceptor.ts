import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LogPageViewInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const ipAddress = this.getIpAddress(request);
    const pageUrl = request.url; // Ou outra forma de identificar a página específica

    if (ipAddress) {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Registrar o acesso no banco de dados

        await this.prisma.log_page_view.create({
          data: {
            ipAddress,
            pageUrl,
            accessedAt: new Date(),
          },
        });

        // Opcional: Contabilizar acessos diários (exemplo simples)
        const dailyCount = await this.prisma.log_page_view.count({
          where: {
            pageUrl,
            accessedAt: {
              gte: today,
              lt: tomorrow,
            },
            ipAddress, // Opcional: contar acessos únicos por IP por página
          },
        });

        console.log(`Acesso registrado para IP: ${ipAddress} na página: ${pageUrl}. Contagem diária (única por IP): ${dailyCount}`);
      } catch (error) {
        console.error('Erro ao registrar acesso:', error);
      }
    }

    return next.handle();
  }

  private getIpAddress(request: Request): string | null | undefined {
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor && typeof forwardedFor === 'string') {
      // Pode haver múltiplos IPs em 'x-forwarded-for', pegamos o primeiro (do cliente original)
      return forwardedFor.split(',')[0].trim();
    }
    return request.ip; // fallback para o IP da conexão direta
  }
}