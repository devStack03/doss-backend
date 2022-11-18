import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coupon } from "../../types/coupon";
import { Event } from "../../types/event";
import { Restaurant } from "../../types/restaurant";
import { couponSeedData } from "../data/coupon-seeds";
import { eventSeedData } from "../data/event-seeds";
import { restaurantSeedData } from "../data/restaurant-seeds";
@Injectable()
export default class CouponCodeSeedService implements OnModuleInit {

  constructor(
    @InjectModel("Coupon") private couponModel: Model<Coupon>,
    @InjectModel("Restaurant") private restaurantModel: Model<Restaurant>,
    @InjectModel("Event") private eventModel: Model<Event>,
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
    });
    restaurantSeedData.forEach((f) => {
      this.restaurantModel
        .findOneAndUpdate({ name: f.name }, { ...f }, { new: true, upsert: true })
        .then((res) => this.logger.debug(`Collection ${this.restaurantModel.collection.name} successfully seeded`))
        .catch((err) => console.log(err));
    });

    eventSeedData.forEach((f) => {
      this.eventModel
        .findOneAndUpdate({ name: f.name }, { ...f }, { new: true, upsert: true })
        .then((res) => this.logger.debug(`Collection ${this.eventModel.collection.name} successfully seeded`))
        .catch((err) => console.log(err));
    })

    console.log('seed updated');
  }

}