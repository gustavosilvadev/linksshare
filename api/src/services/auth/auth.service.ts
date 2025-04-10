import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserAccessService } from "../user/user-access.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4} from "uuid";
// import { identity } from "rxjs";


@Injectable()
export class AuthService {

    constructor(        
        private readonly userService: UserService,
        private readonly userAccessService: UserAccessService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUserName(username);
        if(!user?.id) {
            throw new Error("Usuário não encontrado ou Id indefinido!");
        }

        const userAccess = await this.userAccessService.findOne(user?.id);

        if(!userAccess?.password) {
            throw new Error("Usuário sem permissão de acesso!");
        }
        if(user && (await bcrypt.compare(pass, userAccess?.password))) {
            const { password, ...result} = userAccess;
            return result;
        }

        return null;
    }

    async login(user: any): Promise<{ access_token: string, apiKey: string}> {
        const apiKey = uuidv4();

        await this.userService.updateKeyId(user.id, { apiKey });

        const payload = { sub: user.id, username: user.username, apiKey: apiKey };

        return {
            access_token: await this.jwtService.signAsync(payload),
            apiKey: apiKey,
        };
    }

    async generateApiKey(userId: string): Promise<string> {
        const apiKey = uuidv4();
        await this.userService.updateKeyId(userId, { apiKey });
        return apiKey;

    }
}