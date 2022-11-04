import { OnModuleInit } from "@nestjs/common";
import { Model } from "mongoose";
import { Coupon } from "../../types/coupon";
export default class CouponCodeSeedService implements OnModuleInit {
    private couponModel;
    constructor(couponModel: Model<Coupon>);
    private readonly logger;
    onModuleInit(): void;
    seedData(): void;
    seedCouponData(): void;
}
