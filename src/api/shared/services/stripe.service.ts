import {
  Injectable,
  BadRequestException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomerPortalDto } from 'src/api/users/dto/create-user.dto';
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

    // this.createConfiguration();
  }

  private async createConfiguration() {
    const configuration = await this.stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Cactus Practice partners with Stripe for simplified billing.',
      },
      features: { invoice_history: { enabled: true } },
    });
    console.log(configuration);
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

    return { prices, customer };
    // this.stripe.paymentIntents.retrieve();
  }

  public async priceList() {
    const prices = await this.stripe.prices.list({
      // lookup_keys: ['sample_basic', 'sample_premium'],
      expand: ['data.product']
    });
    if (!prices) throw new BadRequestException('Getting prices was failed');

    return { prices };
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
      payment_settings: {
        payment_method_types: ['card']
      },
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    if (!subscription) throw new BadRequestException('subscription failed');
    return {
      subscriptionId: subscription.id,
      invoiceData: subscription.latest_invoice,
    };
  }

  public async createCustomerPortal(customerPortalDto: CustomerPortalDto) {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerPortalDto.customerId,
        return_url: 'https://doss.es/dashboard',
        // return_url: 'http://localhost:3000/dashboard',
      });
      console.log(session);
      return { session };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('something is wrong');
    }

  }

  public async getSubscriptionDetail(customerId: string) {
    try {
      const detail = await this.stripe.subscriptions.list({
        customer: customerId
      });
      console.log(detail);
      if (detail.data.length)
        return { status: 1, data: detail.data[0], message: 'success' };
      return { status: 0, message: 'can\'t find your data' };

    } catch (error) {
      return { status: 0, message: 'can\'t find your data' };
    }
  }

  async renewSubscription(customerId: string, subscriptionId: string) {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    const _subscription = await this.stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
    });
    return { status: 1, message: 'success', data: _subscription }
  }
}