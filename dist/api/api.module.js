"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const charge_module_1 = require("./charge/charge.module");
const shared_module_1 = require("./shared/shared.module");
const coupon_module_1 = require("./coupon/coupon.module");
const events_module_1 = require("./events/events.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const seed_module_1 = require("./shared/seeds/seed.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            charge_module_1.ChargeModule,
            shared_module_1.SharedModule,
            coupon_module_1.CouponModule,
            seed_module_1.default,
            events_module_1.EventsModule,
            restaurants_module_1.RestaurantsModule
        ],
        providers: [],
        exports: [],
        controllers: []
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map