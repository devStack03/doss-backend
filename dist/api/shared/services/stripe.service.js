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
let StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.default(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-08-01',
        });
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
        if (!subscription)
            throw new common_1.BadRequestException('subscription failed');
        return {
            subscriptionId: subscription.id,
            invoiceData: subscription.latest_invoice,
        };
    }
    async createCustomerPortal(customerPortalDto) {
        try {
            const session = await this.stripe.billingPortal.sessions.create({
                customer: customerPortalDto.customerId,
                return_url: 'http://localhost:3000/dashboard',
            });
            return session;
        }
        catch (error) {
            console.log(error);
        }
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
exports.default = StripeService;
//# sourceMappingURL=stripe.service.js.map