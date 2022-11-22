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
const nodemailer_1 = require("nodemailer");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.nodemailerTransport = (0, nodemailer_1.createTransport)({
            service: this.configService.get('EMAIL_SERVICE'),
            host: 'smtp.gmail.com',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            }
        });
    }
    async sendMail(options) {
        try {
            const result = await this.nodemailerTransport.sendMail(options);
            return result;
        }
        catch (error) {
            common_1.Logger.log(error);
            throw new common_1.RequestTimeoutException('Request timed out');
        }
    }
    async sendPaymentFailureMail(subscriptionDto) {
        const payload = { email: subscriptionDto.email };
        return this.sendMail({
            from: 'Doss <noreply@doss.es>',
            to: payload.email,
            subject: 'Subject here',
            html: 'The payment failed. Update your payment data.',
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
exports.default = EmailService;
//# sourceMappingURL=email.service.js.map