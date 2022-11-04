import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '../shared/types/user';
import { UserDTO, UserSignupDTO } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private userModel;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, userModel: Model<User>);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        msg: string;
        status: number;
        refresh_token: string;
        token_type: string;
        expires_in: string;
        user: any;
    }>;
    create(userDTO: UserSignupDTO): Promise<UserDTO>;
    getTokens(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<User>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        status: number;
        accessToken: string;
        refreshToken: string;
    }>;
    checkEmail(email: string): Promise<{
        status: number;
        msg: string;
    }>;
}
