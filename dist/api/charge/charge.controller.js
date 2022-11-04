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
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_charge_dto_1 = require("./dto/create-charge.dto");
const stripe_service_1 = require("../shared/services/stripe.service");
let ChargeController = class ChargeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createCharge(charge, req) {
        await this.stripeService.charge(charge.amount, charge.paymentMethodId, req.user.stripeCustomerId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_charge_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ChargeController.prototype, "createCharge", null);
ChargeController = __decorate([
    (0, common_1.Controller)('charge'),
    __metadata("design:paramtypes", [stripe_service_1.default])
], ChargeController);
exports.default = ChargeController;
//# sourceMappingURL=charge.controller.js.map