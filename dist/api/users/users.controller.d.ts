import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<import("../shared/types/user").User[]>;
    findOne(params: any): Promise<import("../shared/types/user").User[]>;
    findSecond(id: string): Promise<import("../shared/types/user").User[]>;
}
