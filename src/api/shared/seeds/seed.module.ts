import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";

import CouponCodeSeedService from "./services/coupon-code-seed.service";
import CouponSchema from "src/api/coupon/model/coupon.schema";
@Module({
  imports:[
    MongooseModule.forFeature([{ name: "Coupon", schema: CouponSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    CouponCodeSeedService
  ],
})

export default class SeedModule {};