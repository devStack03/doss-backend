import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
// import { User, UserSchema, UserDocument } from './../users/users.schema';
import { User } from '../shared/types/user';
import { CredentialsDTO } from './dto/auth.dto';
import { UserDTO } from '../users/dto/create-user.dto';
import { validateEmail } from '../shared/utils';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectModel('User') private userModel: Model<User>
    ) {

    }

    async validateUser(email: string, password: string): Promise<any> {
        const validationResult = validateEmail(email);
        if (!validationResult) {
            throw new BadRequestException('Email format is not correct');
        }
        const user = await this.usersService.findOne(email);
        if (!user) throw new NotFoundException('User Not found');
        Logger.log(user)
        if (!user.emailVerified) throw new BadRequestException('Your email address has not been verified');
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const { password, ...result } = user;

            return result;
        } else {
            throw new BadRequestException('Password not matched');
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        const { accessToken, refreshToken } = await this.getTokens(payload);
        await this.usersService.setRefreshToken(refreshToken, user._id);
        return {
            msg: accessToken,
            status: 1,
            refresh_token: refreshToken,
            token_type: "Bearer",
            expires_in: process.env.JWT_EXPIRATION_TIME,
            user
        };
    }

    async create(userDTO: CredentialsDTO): Promise<UserDTO> {
        return this.usersService.create(userDTO);
    }

    async getTokens(payload: any) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: process.env.JWT_EXPIRATION_TIME
                },
            ),
            this.jwtService.signAsync(
                payload,
                {
                    secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findByUserId(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        Logger.log(refreshToken);

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens({ email: user.email, sub: user._id });
        await this.usersService.setRefreshToken(tokens.refreshToken, user._id);
        return { ...tokens, status: 1 };
    }

    async checkEmail(email: string) {
        const user = await this.usersService.findOne(email);
        if (!user) throw new BadRequestException('User not found');
        if (user.emailVerified) {
            return {status: 1, msg: 'Verified.'}
        }
        return { status: 0, msg: 'Not verified.'}
    }
}
