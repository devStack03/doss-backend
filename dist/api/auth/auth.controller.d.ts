import { AuthService } from "./auth.service";
import { CredentialsDTO, EmailDTO, SendLoginCodeDto } from './dto/auth.dto';
import { UserSignupDTO } from "../users/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(user: UserSignupDTO, req: any): Promise<{
        status: number;
        message: string;
        id: string;
        error?: undefined;
    } | {
        status: number;
        error: any;
        message?: undefined;
        id?: undefined;
    }>;
    login(userLoginDto: CredentialsDTO): Promise<{
        status: number;
        message: string;
        accessToken?: undefined;
        refreshToken?: undefined;
        token_type?: undefined;
        expires_in?: undefined;
        user?: undefined;
    } | {
        accessToken: string;
        status: number;
        refreshToken: string;
        token_type: string;
        expires_in: string;
        user: {
            email: string;
            id: string;
            phoneNumber: string;
            fullName: string;
        };
        message?: undefined;
    }>;
    refresh(req: any): Promise<{
        status: number;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<{
        msg: string;
        status: number;
    }>;
    checkEmail(req: any, body: EmailDTO): Promise<{
        status: number;
        msg: string;
    }>;
    sendCode(codeDto: SendLoginCodeDto, req: any): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        data: {
            id: string;
            phoneNumber: string;
        };
        message: string;
    }>;
}
