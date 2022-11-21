import { UsersService } from './users.service';
import { CreateCustomerDto, CustomerPortalDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<import("../shared/types/user").User[]>;
    getUserSubscriptionDetail(req: any): Promise<{
        status: number;
        data: import("stripe").Stripe.Subscription;
        message: string;
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
    findOne(params: any): Promise<import("../shared/types/user").User[]>;
    findSecond(id: string): Promise<import("../shared/types/user").User[]>;
    createCustomer(customer: CreateCustomerDto): Promise<{
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
    createSubscription(subscription: any): Promise<{
        subscriptionId: string;
        invoiceData: string | import("stripe").Stripe.Invoice;
    }>;
    createCustomerPortalSession(customerPortalDto: CustomerPortalDto): Promise<{
        session: import("stripe").Stripe.Response<import("stripe").Stripe.BillingPortal.Session>;
    }>;
}
