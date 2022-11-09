import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './api/auth/local-auth.guard';
import { AuthService } from './api/auth/auth.service';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/answer')
  getAnswer(): Object {
    return this.appService.getAnswer();
  }
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req:any) {
    return req.user;
  }
}
