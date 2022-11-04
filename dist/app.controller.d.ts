import { AppService } from './app.service';
import { AuthService } from './api/auth/auth.service';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    getAnswer(): Object;
    findAll(): string;
    login(req: any): Promise<{
        msg: string;
        status: number;
        refresh_token: string;
        token_type: string;
        expires_in: string;
        user: any;
    }>;
    getProfile(req: any): any;
}
