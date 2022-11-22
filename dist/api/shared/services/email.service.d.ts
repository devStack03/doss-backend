import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
export default class EmailService {
    private readonly configService;
    private nodemailerTransport;
    constructor(configService: ConfigService);
    sendMail(options: Mail.Options): Promise<any>;
    sendPaymentFailureMail(subscriptionDto: any): Promise<any>;
}
