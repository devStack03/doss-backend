import { ConfigService } from '@nestjs/config';
import { CustomerPortalDto } from 'src/api/users/dto/create-user.dto';
import Stripe from 'stripe';
import EmailService from './email.service';
export default class StripeService {
    private configService;
    private emailService;
    private stripe;
    constructor(configService: ConfigService, emailService: EmailService);
    private createConfiguration;
    createCustomer(name: string, email: string): Promise<{
        prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>;
        customer: Stripe.Response<Stripe.Customer>;
    }>;
    priceList(): Promise<{
        prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>;
    }>;
    charge(amount: number, paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    getSecret(cost: any): Promise<{
        client_secret: string;
    }>;
    createSubscription(subscriptionDto: any): Promise<{
        subscriptionId: string;
        invoiceData: string | Stripe.Invoice;
        status?: undefined;
        message?: undefined;
    } | {
        status: number;
        message: string;
        subscriptionId?: undefined;
        invoiceData?: undefined;
    }>;
    createCustomerPortal(customerPortalDto: CustomerPortalDto): Promise<{
        session: Stripe.Response<Stripe.BillingPortal.Session>;
    }>;
    getSubscriptionDetail(customerId: string): Promise<{
        status: number;
        data: Stripe.Subscription;
        message: string;
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
    renewSubscription(customerId: string, subscriptionId: string): Promise<{
        status: number;
        message: string;
        data: Stripe.Response<Stripe.Subscription>;
    }>;
}
