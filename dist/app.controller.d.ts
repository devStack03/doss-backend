import { AppService } from './app.service';
import { AuthService } from './api/auth/auth.service';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    getAnswer(): Object;
    findAll(): string;
    getProfile(req: any): any;
}
