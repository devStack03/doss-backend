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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        return this.userService.findAll();
    }
    async getUserSubscriptionDetail(req) {
        const userId = req.user.id;
        return this.userService.getSubscriptionDetail(userId);
    }
    async findOne(params) {
        console.log(params.id);
        return this.userService.findAll();
    }
    async findSecond(id) {
        console.log(id);
        return this.userService.findAll();
    }
    async priceList() {
        const prices = await this.userService.getPriceList();
        return {
            status: 1,
            prices
        };
    }
    async createCustomer(customer) {
        return this.userService.createCustomer(customer);
    }
    async createSubscription(subscription) {
        return this.userService.createSubscription(subscription);
    }
    async createCustomerPortalSession(customerPortalDto, req) {
        const userId = req.user.id;
        return this.userService.createCustomerPortal(customerPortalDto, userId);
    }
    async renewPlan(req) {
        const userId = req.user.id;
        return this.userService.renewSubscription(userId);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/subscription-detail'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserSubscriptionDetail", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findSecond", null);
__decorate([
    (0, common_1.Get)('/price-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "priceList", null);
__decorate([
    (0, common_1.Post)('/create-customer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Post)('create-subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Post)('/create-customer-portal-session'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CustomerPortalDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCustomerPortalSession", null);
__decorate([
    (0, common_1.Post)('/subscription/renew'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "renewPlan", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map