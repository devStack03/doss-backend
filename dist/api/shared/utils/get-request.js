"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequest = void 0;
const getRequest = (ctx) => {
    switch (ctx.getType()) {
        case 'ws':
            return ctx.switchToWs().getClient();
        case 'http':
            return ctx.switchToHttp().getRequest();
        default:
            return undefined;
    }
};
exports.getRequest = getRequest;
//# sourceMappingURL=get-request.js.map