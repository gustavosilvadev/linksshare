import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthDto } from 'src/dto/auth/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() authDto: AuthDto): Promise<{ access_token: string; apiKey: string }> {
        const user = await this.authService.validateUser(authDto.username, authDto.password);

        if(!user) {
            throw new UnauthorizedException('Credenciais inválidas');

        }
        return this.authService.login(user);
    }
}
