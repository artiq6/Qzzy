import { Controller, Get, Post, Request, Body, UseGuards, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get()
  @Redirect("http://localhost:3001", 301)
  getHello(): string {
    return this.appService.getHello();
  }
}
