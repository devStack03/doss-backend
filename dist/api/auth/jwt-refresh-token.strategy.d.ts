import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(req: Request, payload: any): Promise<any>;
}
export {};
