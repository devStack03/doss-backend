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

@Injectable()
export class CouponService {

  constructor(
    @InjectModel('Coupon') private couponModel: Model<Coupon>
  ){}
  create(createCouponDto: CreateCouponDto) {
    return 'This action adds a new coupon';
  }

  findAll() {
    return `This action returns all coupon`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  async findOneByCode(code: string) {
    const coupon = await this.couponModel.findOne({code});
    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }
    return coupon;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
