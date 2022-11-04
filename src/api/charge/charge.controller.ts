import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateChargeDto from './dto/create-charge.dto';
import StripeService from '../shared/services/stripe.service'; 
@Controller('charge')
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}
 
  @Post()
  @UseGuards(JwtAuthGuard)
  async createCharge(@Body() charge: CreateChargeDto, @Req() req) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, req.user.stripeCustomerId);
  }
}