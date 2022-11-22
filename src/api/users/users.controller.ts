import { Controller, Get, Param, Post, Body, Req, Request, UseGuards, Res, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';
import { CreateCustomerDto, CustomerPortalDto } from './dto/create-user.dto';
import { validateEmail } from '../shared/utils';
import { Logger } from 'winston';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/subscription-detail')
  @UseGuards(JwtAuthGuard)
  async getUserSubscriptionDetail(@Req() req: any) {
    const userId = req.user.id;
    return this.userService.getSubscriptionDetail(userId);
  }

  @Get('/price-list')
  async priceList() {
    const {prices} = await this.userService.getPriceList();
    return {
      status: 1,
      prices
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.userService.findByUserId(id);
  }

  /**
   * another way using Param
   */

  async findSecond(@Param('id') id: string) {
    console.log(id);
    return this.userService.findAll();
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() body: any, @Req() req: any) {
    const userId = req.user.id;
    const _user = await this.userService.update(userId, body);
    return {
      status: 1,
      data: _user
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
  @UseGuards(JwtAuthGuard)
  async createCustomerPortalSession(@Body() customerPortalDto: CustomerPortalDto, @Req() req: any) {
    const userId = req.user.id;
    return this.userService.createCustomerPortal(customerPortalDto, userId);
  }

  @Post('/subscription/renew')
  @UseGuards(JwtAuthGuard)
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