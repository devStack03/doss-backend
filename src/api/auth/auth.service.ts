import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
// import { User, UserSchema, UserDocument } from './../users/users.schema';
import { User } from '../shared/types/user';
import { CredentialsDTO, SendLoginCodeDto } from './dto/auth.dto';
import { UserDTO, UserSignupDTO } from '../users/dto/create-user.dto';
import { randomCode, validateEmail } from '../shared/utils';

let verifyCode = {
    auth: {
        sms: "Doss verification code: @code",
        reset_password: 'Doss reset password code: @code',
    },
};

export enum SMSType {
    VERIFY_REGISTER = 'sms',
    VERIFY_RESET_PASSWORD = 'reset_password'
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly twilioService: TwilioService,
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

    async login(userLoginDto: CredentialsDTO) {
        const user = await this.usersService.findByPhone(userLoginDto.phoneNumber);
        if (!user) return { status: -2, message: 'user not found'};
        if (user.verificationCode !== userLoginDto.code)
            return {status: -3, message: 'invalid code'};

        const payload = { email: userLoginDto.phoneNumber, sub: user._id };
        const { accessToken, refreshToken } = await this.getTokens(payload);
        await this.usersService.setRefreshToken(refreshToken, user._id);
        return {
            accessToken,
            status: 1,
            refreshToken,
            token_type: "Bearer",
            expires_in: process.env.JWT_EXPIRATION_TIME,
            id: user._id
        };
    }

    async create(userDTO: UserSignupDTO): Promise<UserDTO> {
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
            return { status: 1, msg: 'Verified.' }
        }
        return { status: 0, msg: 'Not verified.' }
    }

    async sendLoginCode(loginCodeDto: SendLoginCodeDto) {
        const user = await this.usersService.findByPhone(loginCodeDto.phoneNumber);
        if (!user) {
            return { status: -1, message: 'user not found' };
        }

        const { message, code } = await this.sendSMS(loginCodeDto.phoneNumber, SMSType.VERIFY_REGISTER);

        if (message.errorCode) {
            throw new BadRequestException(message.errorMessage);
        }
        user.verificationCode = code;
        await user.save();
        const { id, verificationCode, phoneNumber } = user;
        return {
            status: 1,
            data: {
                id,
                phoneNumber
            },
            message: 'Verification code sent'
        }
    }

    async sendSMS(phoneNumber: string, smsType: SMSType) {
        const code = randomCode(6, "123456789");
        const sms = verifyCode.auth[smsType].replace("@code", String(code));
        const message = await this.twilioService.client.messages.create({
            body: sms,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+34${phoneNumber}`,
        });

        return { message, code };
    }

}
