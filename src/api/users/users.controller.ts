import { Controller, Get, Param, Post, Body, Req, Request, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/api/auth/local-auth.guard';
import { CreateCustomerDto, CustomerPortalDto } from './dto/create-user.dto';
import { validateEmail } from '../shared/utils';
import { Logger } from 'winston';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('')
  async findAll() {
    return this.userService.findAll();
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

  @Post('/create-customer')
  async createCustomer(@Body() customer: CreateCustomerDto) {
    return this.userService.createCustomer(customer);
  }

  @Post('create-subscription')
  async createSubscription(@Body() subscription: any) {
    return this.userService.createSubscription(subscription);
  }

  @Post('create-customer-portal-session')
  async createCustomerPortalSession(@Body() customerPortalDto: CustomerPortalDto, @Res() res: any) {
    console.log(customerPortalDto);
    const session = await this.userService.createCustomerPortal(customerPortalDto);
    // res.redirect(session.url);
    return session;
  }
}



// const mapToDto = (user: User) => {
//     const sanitized = user.toObject();
//     delete sanitized['password'];
//     return sanitized;

// }