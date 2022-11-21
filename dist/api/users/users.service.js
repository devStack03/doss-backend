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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const utils_1 = require("../shared/utils/utils");
const stripe_service_1 = require("../shared/services/stripe.service");
let UsersService = class UsersService {
    constructor(userModel, stripeService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
    }
    async create(userDTO) {
        const { email } = userDTO;
        const validationResult = (0, utils_1.validateEmail)(email);
        if (!validationResult) {
            throw new common_1.HttpException("Email format is incorrect", common_1.HttpStatus.BAD_REQUEST);
        }
        let userAlreadyExists = false;
        let errorCode = -2;
        if (!userAlreadyExists) {
            const user = await this.userModel.findOne({ email });
            userAlreadyExists = !!user;
            errorCode = -4;
        }
        if (!userAlreadyExists) {
            const user = await this.findByPhone(userDTO.phoneNumber);
            userAlreadyExists = !!user;
            errorCode = -5;
        }
        if (userAlreadyExists) {
            return { status: errorCode, error: 'user already exists' };
        }
        common_1.Logger.log(userDTO);
        const newUser = new this.userModel(userDTO);
        try {
            await newUser.validate();
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException(e);
        }
        try {
            await newUser.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
        return newUser;
    }
    async findOne(email) {
        return this.userModel.findOne({ email: email });
    }
    async findByPhone(phoneNumber) {
        const user = await this.userModel.findOne({ phoneNumber });
        return user;
    }
    async findByUserId(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User Not found');
        return user;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.BadRequestException('User Not found');
        return user;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async update(userId, updateUserDto) {
        return this.userModel
            .findByIdAndUpdate(userId, updateUserDto, { new: true })
            .exec();
    }
    async setRefreshToken(refreshToken, userId) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        return this.userModel.findByIdAndUpdate(userId, {
            refreshToken: hashedRefreshToken
        });
    }
    async markEmailAsConfirmed(email) {
        return this.userModel.updateOne({ email }, {
            emailVerified: true
        });
    }
    async createCustomer(_customer) {
        let userAlreadyExists = false;
        let errorCode = -2;
        if (!userAlreadyExists) {
            const user = await this.userModel.findOne({ email: _customer.email });
            userAlreadyExists = !!user;
            errorCode = -4;
        }
        if (!userAlreadyExists) {
            console.log(_customer.phoneNumber);
            const user = await this.findByPhone(_customer.phoneNumber);
            userAlreadyExists = !!user;
            errorCode = -5;
        }
        if (userAlreadyExists) {
            return { status: errorCode, error: 'user already exists' };
        }
        const { customer, prices } = await this.stripeService.createCustomer(_customer.name, _customer.email);
        return { status: 1, customer, prices };
    }
    async createSubscription(subscriptionDto) {
        return this.stripeService.createSubscription(subscriptionDto);
    }
    async createCustomerPortal(customerPortalDto, userId) {
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.createCustomerPortal(customerPortalDto);
    }
    async getSubscriptionDetail(userId) {
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.getSubscriptionDetail(user.stripeCustomerId);
    }
    async renewSubscription(userId) {
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.renewSubscription(user.stripeCustomerId, user.stripeSubscriptionId);
    }
    async getPriceList() {
        return this.stripeService.priceList();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        stripe_service_1.default])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map