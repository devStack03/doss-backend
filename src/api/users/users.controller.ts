import { Controller, Get, Param, Post, Body, Req, Request, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';
import { CreateCustomerDto, CustomerPortalDto } from './dto/create-user.dto';
import { validateEmail } from '../shared/utils';
import { Logger } from 'winston';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/subscription-detail')
  @UseGuards(JwtAuthGuard)
  async getUserSubscriptionDetail(@Req() req: any) {
    const userId = req.user.id;
    return this.userService.getSubscriptionDetail(userId);
  }

  @Get(':id')
  async findOne(@Param() params) {
    console.log(params.id);
    return this.userService.findAll();
  }



  /**
   * another way using Param
   */

  async findSecond(@Param('id') id: string) {
    console.log(id);
    return this.userService.findAll();
  }

  @Get('/price-list')
  async priceList() {
    const prices = await this.userService.getPriceList();
    return {
      status: 1,
      prices
    }
  }

  @Post('/create-customer')
  async createCustomer(@Body() customer: CreateCustomerDto) {
    return this.userService.createCustomer(customer);
  }

  @Post('create-subscription')
  async createSubscription(@Body() subscription: any) {
    return this.userService.createSubscription(subscription);
  }

  @Post('/create-customer-portal-session')
  async createCustomerPortalSession(@Body() customerPortalDto: CustomerPortalDto, @Req() req: any) {
    const userId = req.user.id;
    return this.userService.createCustomerPortal(customerPortalDto, userId);
  }

  @Post('/subscription/renew')
  async renewPlan(@Req() req: any) {
    const userId = req.user.id;
    return this.userService.renewSubscription(userId);
  }
}



// const mapToDto = (user: User) => {
//     const sanitized = user.toObject();
//     delete sanitized['password'];
//     return sanitized;
// }