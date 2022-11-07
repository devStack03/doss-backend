import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from '../shared/types/coupon';
import { UsersService } from '../users/users.service';
import { CreateCustomerDto } from '../users/dto/create-user.dto';

@Injectable()
export class CouponService {

  constructor(
    @InjectModel('Coupon') private couponModel: Model<Coupon>,
    private usersService: UsersService
  ) { }
  create(createCouponDto: CreateCouponDto) {
    return 'This action adds a new coupon';
  }

  findAll() {
    return `This action returns all coupon`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  async findOneByCode(customer: CreateCustomerDto) {
    const coupon = await this.couponModel.findOne({ code: customer.code });
    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }
    //create stripe customer
    return this.usersService.createCustomer(customer);
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
