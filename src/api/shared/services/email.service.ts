import { Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.nodemailerTransport = createTransport({
            service: this.configService.get('EMAIL_SERVICE'),
            host: 'smtp.gmail.com', 
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            }
        });
    }

    async sendMail(options: Mail.Options) {
        try {
            const result = await this.nodemailerTransport.sendMail(options);
            return result
        } catch (error) {
            Logger.log(error);
            throw new RequestTimeoutException('Request timed out');
        }
    }

    async sendPaymentFailureMail(subscriptionDto: any) {
      const payload = {email: subscriptionDto.email};
      return this.sendMail({
        from: 'Doss <noreply@doss.es>',
        to: payload.email,
        subject: 'Subject here',
        html: 'The payment failed. Update your payment data.',
      })
    }
}