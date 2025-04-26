import { Controller, Param, Request, NotFoundException, Get } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ProfileService } from '../../services/profile/profile.service';

@Controller('/')
export class ProfileController {
    constructor(
        private readonly profileService : ProfileService,

    ) {}

    @Get(':username')
    showLinks(@Param('username') username: string, @Request() req: ExpressRequest) {
    if (!username) {
        throw new NotFoundException('Links não encontrados para este usuário.');
    }
    return this.profileService.findLinksByUserName(username);
    }
}