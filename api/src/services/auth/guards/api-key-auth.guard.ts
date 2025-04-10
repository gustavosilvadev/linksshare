import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class ApiKeyAuthGuards implements CanActivate {
    constructor(private readonly userService: UserService){}

    async canActivate(context: ExecutionContext) : Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if(!apiKey) {
            throw new UnauthorizedException('Api Key não fornecida.');
        }

        const user = await this.userService.findOne(apiKey.toString());

        if(!user) {
            throw new UnauthorizedException('Api Key inválido.');
        }

        request['user'] = user;
        return true;
    }
}