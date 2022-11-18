"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CouponCodeSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coupon_seeds_1 = require("../data/coupon-seeds");
const event_seeds_1 = require("../data/event-seeds");
const restaurant_seeds_1 = require("../data/restaurant-seeds");
let CouponCodeSeedService = CouponCodeSeedService_1 = class CouponCodeSeedService {
    constructor(couponModel, restaurantModel, eventModel) {
        this.couponModel = couponModel;
        this.restaurantModel = restaurantModel;
        this.eventModel = eventModel;
        this.logger = new common_1.Logger(CouponCodeSeedService_1.name);
    }
    onModuleInit() {
        if (process.env.MONGO_SEED_DB && process.env.MONGO_SEED_DB === "true") {
            this.logger.warn(`Seed module (${CouponCodeSeedService_1.name}) has been initialized and updates collections (flag: ${process.env.MONGO_SEED_DB})`);
            this.seedData();
        }
        else {
            this.logger.warn(`Seed module is disabled, seed scripts didn't run.`);
        }
    }
    seedData() {
        this.seedCouponData();
    }
    seedCouponData() {
        coupon_seeds_1.couponSeedData.forEach((f) => {
            this.couponModel
                .findOneAndUpdate({ code: f.code }, Object.assign({}, f), { new: true, upsert: true })
                .then((res) => this.logger.debug(`Collection ${this.couponModel.collection.name} successfully seeded`))
                .catch((err) => this.logger.error(err));
        });
        restaurant_seeds_1.restaurantSeedData.forEach((f) => {
            this.restaurantModel
                .findOneAndUpdate({ name: f.name }, Object.assign({}, f), { new: true, upsert: true })
                .then((res) => this.logger.debug(`Collection ${this.restaurantModel.collection.name} successfully seeded`))
                .catch((err) => console.log(err));
        });
        event_seeds_1.eventSeedData.forEach((f) => {
            this.eventModel
                .findOneAndUpdate({ name: f.name }, Object.assign({}, f), { new: true, upsert: true })
                .then((res) => this.logger.debug(`Collection ${this.eventModel.collection.name} successfully seeded`))
                .catch((err) => console.log(err));
        });
        console.log('seed updated');
    }
};
CouponCodeSeedService = CouponCodeSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Coupon")),
    __param(1, (0, mongoose_1.InjectModel)("Restaurant")),
    __param(2, (0, mongoose_1.InjectModel)("Event")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CouponCodeSeedService);
exports.default = CouponCodeSeedService;
//# sourceMappingURL=coupon-code-seed.service.js.map