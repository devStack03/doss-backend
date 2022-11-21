import { Model } from 'mongoose';
import { User } from '../shared/types/user';
import { CreateCustomerDto, CustomerPortalDto, UserSignupDTO } from './dto/create-user.dto';
import StripeService from '../shared/services/stripe.service';
export declare class UsersService {
    private userModel;
    private stripeService;
    constructor(userModel: Model<User>, stripeService: StripeService);
    create(userDTO: UserSignupDTO): Promise<any>;
    findOne(email: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByPhone(phoneNumber: string): Promise<User & {
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
        error: string;
        customer?: undefined;
        prices?: undefined;
    } | {
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
        error?: undefined;
    }>;
    createSubscription(subscriptionDto: any): Promise<{
        subscriptionId: string;
        invoiceData: string | import("stripe").Stripe.Invoice;
    }>;
    createCustomerPortal(customerPortalDto: CustomerPortalDto): Promise<{
        session: import("stripe").Stripe.Response<import("stripe").Stripe.BillingPortal.Session>;
    }>;
    getSubscriptionDetail(userId: string): Promise<{
        status: number;
        data: import("stripe").Stripe.Subscription;
        message: string;
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
}
