import { AuthService } from "./auth.service";
import { EmailDTO } from './dto/auth.dto';
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
    login(req: any): Promise<{
        msg: string;
        status: number;
        refresh_token: string;
        token_type: string;
        expires_in: string;
        user: any;
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
}
