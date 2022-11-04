import { Injectable } from '@nestjs/common';
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
    return this.stripe.customers.create({
      name,
      email
    });
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
      automatic_payment_methods: { enabled: true },
    });
    return { client_secret: paymentIntent.client_secret }
  }
}