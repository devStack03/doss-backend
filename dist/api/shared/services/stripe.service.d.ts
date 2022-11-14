import { ConfigService } from '@nestjs/config';
import { CustomerPortalDto } from 'src/api/users/dto/create-user.dto';
import Stripe from 'stripe';
export default class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    private createConfiguration;
    createCustomer(name: string, email: string): Promise<{
        prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>;
        customer: Stripe.Response<Stripe.Customer>;
    }>;
    charge(amount: number, paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    getSecret(cost: any): Promise<{
        client_secret: string;
    }>;
    createSubscription(subscriptionDto: any): Promise<{
        subscriptionId: string;
        invoiceData: string | Stripe.Invoice;
    }>;
    createCustomerPortal(customerPortalDto: CustomerPortalDto): Promise<{
        session: Stripe.Response<Stripe.BillingPortal.Session>;
    }>;
}
