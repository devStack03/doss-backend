"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
const stripe_1 = require("stripe");
const email_service_1 = require("./email.service");
let StripeService = class StripeService {
    constructor(configService, emailService) {
        this.configService = configService;
        this.emailService = emailService;
        this.stripe = new stripe_1.default(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-08-01',
        });
    }
    async createConfiguration() {
        const configuration = await this.stripe.billingPortal.configurations.create({
            business_profile: {
                headline: 'Cactus Practice partners with Stripe for simplified billing.',
            },
            features: { invoice_history: { enabled: true } },
        });
        console.log(configuration);
    }
    async createCustomer(name, email) {
        const customer = await this.stripe.customers.create({
            name,
            email
        });
        if (!customer)
            throw new common_1.BadRequestException('Stripe customer creation failed');
        const prices = await this.stripe.prices.list({
            expand: ['data.product']
        });
        if (!prices)
            throw new common_1.BadRequestException('Getting prices was failed');
        return { prices, customer };
    }
    async priceList() {
        const prices = await this.stripe.prices.list({
            expand: ['data.product']
        });
        if (!prices)
            throw new common_1.BadRequestException('Getting prices was failed');
        return { prices };
    }
    async charge(amount, paymentMethodId, customerId) {
        return this.stripe.paymentIntents.create({
            amount,
            customer: customerId,
            payment_method: paymentMethodId,
            currency: this.configService.get('STRIPE_CURRENCY'),
            confirm: true,
            payment_method_types: [
                'card'
            ],
        });
    }
    async getSecret(cost) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: cost * 100,
            currency: 'eur',
            payment_method_types: [
                'card'
            ],
        });
        return { client_secret: paymentIntent.client_secret };
    }
    async createSubscription(subscriptionDto) {
        try {
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
            if (!subscription) {
                throw new common_1.BadRequestException('subscription failed');
            }
            return {
                subscriptionId: subscription.id,
                invoiceData: subscription.latest_invoice,
            };
        }
        catch (error) {
            console.log(error);
            await this.emailService.sendPaymentFailureMail(subscriptionDto);
            return {
                status: -11,
                message: 'payment failure'
            };
        }
    }
    async createCustomerPortal(customerPortalDto) {
        try {
            const session = await this.stripe.billingPortal.sessions.create({
                customer: customerPortalDto.customerId,
                return_url: 'https://doss.es/dashboard',
            });
            console.log(session);
            return { session };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('something is wrong');
        }
    }
    async getSubscriptionDetail(customerId) {
        try {
            const detail = await this.stripe.subscriptions.list({
                customer: customerId
            });
            console.log(detail);
            if (detail.data.length)
                return { status: 1, data: detail.data[0], message: 'success' };
            return { status: 0, message: 'can\'t find your data' };
        }
        catch (error) {
            return { status: 0, message: 'can\'t find your data' };
        }
    }
    async renewSubscription(customerId, subscriptionId) {
        const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
        const _subscription = await this.stripe.subscriptions.update(subscription.id, {
            cancel_at_period_end: false,
        });
        return { status: 1, message: 'success', data: _subscription };
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        email_service_1.default])
], StripeService);
exports.default = StripeService;
//# sourceMappingURL=stripe.service.js.map