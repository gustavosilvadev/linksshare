import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LogPageViewInterceptor } from 'src/interceptors/log-page-view.interceptor';
import { PrismaService } from 'prisma/prisma.service';

@Controller('log/viewpage')
@UseInterceptors(new LogPageViewInterceptor(new PrismaService()))
export class LogPageViewController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    async logPageView() {
        return { message: 'Pagina de visualização logada!'};
    }
}


