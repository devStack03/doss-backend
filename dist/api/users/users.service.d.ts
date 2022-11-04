/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User } from '../shared/types/user';
import { UserSignupDTO } from './dto/create-user.dto';
import StripeService from '../shared/services/stripe.service';
export declare class UsersService {
    private userModel;
    private stripeService;
    constructor(userModel: Model<User>, stripeService: StripeService);
    create(userDTO: UserSignupDTO): Promise<any>;
    findOne(email: string): Promise<import("mongoose")._LeanDocument<User & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findByUserId(userId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByEmail(email: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<User[]>;
    update(userId: string, updateUserDto: any): Promise<User>;
    setRefreshToken(refreshToken: string, userId: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    markEmailAsConfirmed(email: string): Promise<import("mongodb").UpdateResult>;
}
