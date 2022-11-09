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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const jwt_refresh_guard_1 = require("./jwt-refresh.guard");
const auth_dto_1 = require("./dto/auth.dto");
const general_response_dto_1 = require("../shared/dto/general.response.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const dto_1 = require("../shared/dto");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(user, req) {
        try {
            const _user = await this.authService.create(user);
            return { status: 1, message: 'Verify your email.', id: _user.id };
        }
        catch (error) {
            return { status: -1, error: error };
        }
    }
    async login(userLoginDto) {
        console.log(userLoginDto);
        return this.authService.login(userLoginDto);
    }
    async refresh(req) {
        return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
    }
    async logout(req) {
        common_1.Logger.log(req.user.id);
        const user = await this.authService.logout(req.user.id);
        if (!user)
            throw new common_1.BadRequestException('Bad request');
        return { msg: 'Signed out successfully', status: 1 };
    }
    async checkEmail(req, body) {
        return this.authService.checkEmail(body.email);
    }
    async sendCode(codeDto, req) {
        return this.authService.sendLoginCode(codeDto);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({
        summary: "User register endpoint.",
        description: "User signup with email, password."
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_dto_1.SignupResponseDTO, description: "Verify your email" }),
    (0, swagger_1.ApiResponse)({ status: 400, type: dto_1.ErrorResponseDTO, description: "Validation error" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UserSignupDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({
        summary: "User login endpoint.",
        description: "User login with phonenumber, code."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: auth_dto_1.LoginResponseDTO, description: "User logged and JWT returned." }),
    (0, swagger_1.ApiResponse)({ status: 400, type: dto_1.ErrorResponseDTO, description: "Validation error" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CredentialsDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.default),
    (0, common_1.Get)('/refresh'),
    (0, swagger_1.ApiOperation)({
        summary: "Refresh token endpoint.",
        description: "Getting a new access token when the access token has been terminated. Attach the previous refresh_token value into Bearer header."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: auth_dto_1.RefreshTokenDTO, description: "New access_token, refresh_token are returned." }),
    (0, swagger_1.ApiResponse)({ status: 400, type: dto_1.ErrorResponseDTO, description: "Validation error" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/logout'),
    (0, swagger_1.ApiOperation)({
        summary: "Logout endpoint.",
        description: "User logout api. Access token is required."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: general_response_dto_1.GeneralResponseDTO, description: "New access_token, refresh_token are returned." }),
    (0, swagger_1.ApiResponse)({ status: 400, type: dto_1.ErrorResponseDTO, description: "Validation error" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: auth_dto_1.EmailDTO }),
    (0, common_1.Post)('/check-email'),
    (0, swagger_1.ApiOperation)({
        summary: "Check user email endpoint.",
        description: "Check user email whether it has been already verified or not."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: general_response_dto_1.GeneralResponseDTO, description: "Email verified or not." }),
    (0, swagger_1.ApiResponse)({ status: 400, type: dto_1.ErrorResponseDTO, description: "Validation error" }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.EmailDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Post)('/send_login_code'),
    (0, swagger_1.ApiOperation)({
        summary: "Send SMS for phone number login"
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendLoginCodeDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendCode", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map