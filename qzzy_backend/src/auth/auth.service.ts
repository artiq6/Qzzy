import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async signIn(mail: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(mail);
        console.log(pass, await bcrypt.compare(pass, user.password))
        if (!user && !await bcrypt.compare(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, login: user.login };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
    async validateUser(mail: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(mail);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(userData: any): Promise<any> {
        return await this.usersService.register(userData);
    }

    async login(user: any): Promise<any> {
        const payload = { mail: user.mail, sub: user.id, is_admin: user.is_admin }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
