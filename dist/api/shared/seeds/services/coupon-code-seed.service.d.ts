import { OnModuleInit } from "@nestjs/common";
import { Model } from "mongoose";
import { Coupon } from "../../types/coupon";
import { Event } from "../../types/event";
import { Restaurant } from "../../types/restaurant";
export default class CouponCodeSeedService implements OnModuleInit {
    private couponModel;
    private restaurantModel;
    private eventModel;
    constructor(couponModel: Model<Coupon>, restaurantModel: Model<Restaurant>, eventModel: Model<Event>);
    private readonly logger;
    onModuleInit(): void;
    seedData(): void;
    seedCouponData(): void;
}
