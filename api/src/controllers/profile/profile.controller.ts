import { Controller, Param, Request, Get, UseInterceptors } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LogPageViewInterceptor } from 'src/interceptors/log-page-view.interceptor';
import { ProfileService } from '../../services/profile/profile.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('/')
export class ProfileController {
    constructor(
        private readonly profileService : ProfileService,

    ) {}

    @Get(':paramUrl')
    @UseInterceptors(new LogPageViewInterceptor(new PrismaService()))
    showLinks(@Param('paramUrl') paramUrl: string, @Request() req: ExpressRequest) 
    {
        if (!paramUrl) {
            return req.hostname;
        }else {

            let urlByParam = this.profileService.findPageByNameParam(paramUrl);
            if(!urlByParam){
                return req.hostname;
            }else{
                return urlByParam;
            }
        }
    }
}