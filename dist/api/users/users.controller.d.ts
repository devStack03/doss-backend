import { UsersService } from './users.service';
import { CreateCustomerDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<import("../shared/types/user").User[]>;
    findOne(params: any): Promise<import("../shared/types/user").User[]>;
    findSecond(id: string): Promise<import("../shared/types/user").User[]>;
    createCustomer(customer: CreateCustomerDto): Promise<{
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
    }>;
    createSubscription(subscription: any): Promise<{
        subscriptionId: string;
        invoiceData: string | import("stripe").Stripe.Invoice;
    }>;
}
