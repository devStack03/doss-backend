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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const utils_1 = require("../shared/utils");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, userModel) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.userModel = userModel;
    }
    async validateUser(email, password) {
        const validationResult = (0, utils_1.validateEmail)(email);
        if (!validationResult) {
            throw new common_1.BadRequestException('Email format is not correct');
        }
        const user = await this.usersService.findOne(email);
        if (!user)
            throw new common_1.NotFoundException('User Not found');
        common_2.Logger.log(user);
        if (!user.emailVerified)
            throw new common_1.BadRequestException('Your email address has not been verified');
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        else {
            throw new common_1.BadRequestException('Password not matched');
        }
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id };
        const { accessToken, refreshToken } = await this.getTokens(payload);
        await this.usersService.setRefreshToken(refreshToken, user._id);
        return {
            msg: accessToken,
            status: 1,
            refresh_token: refreshToken,
            token_type: "Bearer",
            expires_in: process.env.JWT_EXPIRATION_TIME,
            user
        };
    }
    async create(userDTO) {
        return this.usersService.create(userDTO);
    }
    async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async logout(userId) {
        return this.usersService.update(userId, { refreshToken: null });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findByUserId(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        common_2.Logger.log(refreshToken);
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens({ email: user.email, sub: user._id });
        await this.usersService.setRefreshToken(tokens.refreshToken, user._id);
        return Object.assign(Object.assign({}, tokens), { status: 1 });
    }
    async checkEmail(email) {
        const user = await this.usersService.findOne(email);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (user.emailVerified) {
            return { status: 1, msg: 'Verified.' };
        }
        return { status: 0, msg: 'Not verified.' };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map