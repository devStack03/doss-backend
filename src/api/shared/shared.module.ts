import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import StripeService from './services/stripe.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
      StripeService
    ],
    exports: [
      StripeService
    ],
    controllers: []
})
export class SharedModule { }