import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";

import CouponCodeSeedService from "./services/coupon-code-seed.service";
import CouponSchema from "src/api/coupon/model/coupon.schema";
import RestaurantSchema from "src/api/restaurants/model/restaurant.schema";
import EventSchema from "src/api/events/model/event.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Coupon", schema: CouponSchema },
      { name: "Restaurant", schema: RestaurantSchema },
      { name: "Event", schema: EventSchema }
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    CouponCodeSeedService
  ],
})

export default class SeedModule { };