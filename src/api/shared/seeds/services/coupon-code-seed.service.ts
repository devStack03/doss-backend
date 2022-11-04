import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coupon } from "../../types/coupon";
import { couponSeedData } from "../data/coupon-seeds";
@Injectable()
export default class CouponCodeSeedService implements OnModuleInit {

  constructor(
    @InjectModel("Coupon") private couponModel: Model<Coupon>,
  ) { }

  private readonly logger = new Logger(CouponCodeSeedService.name);

  onModuleInit() {
    if (process.env.MONGO_SEED_DB && process.env.MONGO_SEED_DB === "true") {
      this.logger.warn(
        `Seed module (${CouponCodeSeedService.name}) has been initialized and updates collections (flag: ${process.env.MONGO_SEED_DB})`
      );
      this.seedData();
    } else {
      this.logger.warn(`Seed module is disabled, seed scripts didn't run.`);
    }
  }

  seedData() {
    this.seedCouponData();
  }

  seedCouponData() {
    couponSeedData.forEach((f) => {
      this.couponModel
        .findOneAndUpdate({ code: f.code }, { ...f }, { new: true, upsert: true })
        .then((res) => this.logger.debug(`Collection ${this.couponModel.collection.name} successfully seeded`))
        .catch((err) => this.logger.error(err));
    })
  }

}