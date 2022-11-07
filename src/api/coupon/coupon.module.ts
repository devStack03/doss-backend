import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import CouponSchema from './model/coupon.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'Coupon', schema: CouponSchema
      }
    ]),
    UsersModule
  ],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
