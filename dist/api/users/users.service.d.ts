import { Model } from 'mongoose';
import { User } from '../shared/types/user';
import { CreateCustomerDto, UserSignupDTO } from './dto/create-user.dto';
import StripeService from '../shared/services/stripe.service';
export declare class UsersService {
    private userModel;
    private stripeService;
    constructor(userModel: Model<User>, stripeService: StripeService);
    create(userDTO: UserSignupDTO): Promise<any>;
    findOne(email: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
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
    createCustomer(_customer: CreateCustomerDto): Promise<{
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
    }>;
    createSubscription(subscriptionDto: any): Promise<{
        subscriptionId: string;
        invoiceData: string | import("stripe").Stripe.Invoice;
    }>;
}
