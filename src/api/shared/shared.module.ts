import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import StripeService from './services/stripe.service';
import EmailService from './services/email.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
      StripeService,
      EmailService
    ],
    exports: [
      StripeService,
      EmailService
    ],
    controllers: []
})
export class SharedModule { }