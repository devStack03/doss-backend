import {
  Injectable,
  BadRequestException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(
      configService.get('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2022-08-01',
      }
    );
  }

  public async createCustomer(name: string, email: string) {
    const customer = await this.stripe.customers.create({
      name,
      email
    });
    if (!customer) throw new BadRequestException('Stripe customer creation failed');

    const prices = await this.stripe.prices.list({
      // lookup_keys: ['sample_basic', 'sample_premium'],
      expand: ['data.product']
    });
    if (!prices) throw new BadRequestException('Getting prices was failed');

    return {prices, customer};
    // this.stripe.paymentIntents.retrieve();
  }

  public async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirm: true,
      payment_method_types: [
        'card'
      ],
    })
  }

  public async getSecret(cost) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: cost * 100,
      currency: 'eur',
      payment_method_types: [
        'card'
      ],
    });
    return { client_secret: paymentIntent.client_secret }
  }

  public async createSubscription(subscriptionDto: any) {
    const subscription = await this.stripe.subscriptions.create({
      customer: subscriptionDto.customerId,
      items: [{
        price: subscriptionDto.priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    if (!subscription) throw new BadRequestException('subscription failed');
    return {
      subscriptionId: subscription.id,
      invoiceData: subscription.latest_invoice,
    };
  }
}