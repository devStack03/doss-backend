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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantModel, offerModel, usersService) {
        this.restaurantModel = restaurantModel;
        this.offerModel = offerModel;
        this.usersService = usersService;
    }
    async create(createRestaurantDto) {
        const res = await this.restaurantModel.create(createRestaurantDto);
        return { status: 1, data: res, message: 'success' };
    }
    async findAll(userId = null) {
        const allRestaurants = await this.restaurantModel.find().sort({ status: 1 }).lean().exec();
        let temp = [];
        for (let r of allRestaurants) {
            const offers = await this.offerModel.find({ restaurant: r._id, user: userId });
            const t = Object.assign(Object.assign({}, r), { id: r._id, offerId: offers.length ? offers[0]._id : null, status: offers.length ? 1 : 0 });
            temp.push(t);
        }
        return {
            status: 1,
            data: temp,
            message: 'success'
        };
    }
    findOne(id) {
        return `This action returns a #${id} restaurant`;
    }
    async findByRestaurantId(restaurantId) {
        const restaurant = await this.restaurantModel.findById(restaurantId);
        if (!restaurant)
            throw new common_1.BadRequestException('Offer Not found');
        return restaurant;
    }
    update(id, updateRestaurantDto) {
        return `This action updates a #${id} restaurant`;
    }
    remove(id) {
        return `This action removes a #${id} restaurant`;
    }
    async activate(restaurantId, userId) {
        const restaurant = await this.findByRestaurantId(restaurantId);
        const user = await this.usersService.findByUserId(userId);
        const newOffer = new this.offerModel({
            user,
            restaurant
        });
        await newOffer.save();
        return {
            status: 1,
            data: Object.assign(Object.assign({}, restaurant.toJSON()), { offerId: newOffer._id, status: 1 }),
            message: 'activated offer'
        };
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Restaurant')),
    __param(1, (0, mongoose_1.InjectModel)('UserOffer')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map