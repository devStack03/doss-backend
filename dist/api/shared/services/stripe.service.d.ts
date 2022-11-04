import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export default class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createCustomer(name: string, email: string): Promise<Stripe.Response<Stripe.Customer>>;
    charge(amount: number, paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
}
