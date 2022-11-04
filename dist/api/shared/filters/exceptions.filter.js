"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
let ExceptionsFilter = class ExceptionsFilter {
    catch(exception, host) {
        const request = (0, utils_1.getRequest)(host);
        const statusCode = this.isHttpException(exception)
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const response = {
            statusCode,
            error: 'Error',
            message: exception.message,
            timestamp: Date.now() / 1000,
        };
        const error = exception.getResponse();
        if (typeof error === 'string') {
            response.message = error;
        }
        else {
            Object.assign(response, error);
        }
        switch (host.getType()) {
            case 'http':
                host.switchToHttp().getResponse().status(statusCode).json(response);
                break;
            case 'ws':
                const callback = host.getArgByIndex(2);
                if (typeof callback === 'function') {
                    callback(response);
                }
                request.emit('exception', response);
                break;
            default:
                break;
        }
        return response;
    }
    isHttpException(err) {
        return err instanceof common_1.HttpException;
    }
};
ExceptionsFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ExceptionsFilter);
exports.ExceptionsFilter = ExceptionsFilter;
//# sourceMappingURL=exceptions.filter.js.map