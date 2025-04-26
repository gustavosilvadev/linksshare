// auth.guard.ts
import { 
        Injectable, 
        CanActivate, 
        ExecutionContext, 
        UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService : JwtService,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token) {
            throw new UnauthorizedException('Authorization Token not found');
        }
        let payload:any;

        try {
            payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            );
            request['user'] = payload;
        }catch {
            throw new UnauthorizedException('Invalid authorization token')
        }

        const user = await this.userService.findByUserName(payload.username);
        
        if(!user) {
            throw new UnauthorizedException("User not found");
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
