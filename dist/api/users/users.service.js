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
const stripe_service_1 = require("../shared/services/stripe.service");
let UsersService = class UsersService {
    constructor(userModel, stripeService) {
        this.userModel = userModel;
        this.stripeService = stripeService;
    }
    async create(userDTO) {
        const { email } = userDTO;
        const findEmailRegExp = `^${userDTO.email}$`;
        const userMatch = await this.userModel.find({ email: { $regex: findEmailRegExp, $options: "i" } });
        let userAlreadyExists = userMatch.length > 0;
        if (!userAlreadyExists) {
            const user = await this.userModel.findOne({ email });
            userAlreadyExists = !!user;
        }
        if (userAlreadyExists) {
            const user = userMatch[0];
            throw new common_1.HttpException("User already exists", common_1.HttpStatus.BAD_REQUEST);
        }
        common_1.Logger.log(userDTO);
        const stripeCustomer = await this.stripeService.createCustomer(userDTO.fullName, userDTO.email);
        userDTO.stripeCustomerId = stripeCustomer.id;
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
        return this.userModel.findOne({ email: email }).select("email password emailVerified").lean().exec();
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
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        stripe_service_1.default])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map