import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async register(@Body() data: any) {
        return this.authService.register(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/jwt')
    getProfile(@Request() req) {
        return req.user;
    }
}
