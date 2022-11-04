"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_module_1 = require("./app.module");
const app_documentation_1 = require("./app.documentation");
async function bootstrap() {
    const opt = {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
                }),
            ],
            level: process.env.LOG_LEVEL,
        }),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, opt);
    app.enableCors();
    app.setGlobalPrefix('api');
    (0, app_documentation_1.default)(app);
    const port = process.env.PORT || 5001;
    const logger = new common_1.Logger('NestApplication');
    await app.listen(port, () => logger.log(`Server(${process.env.NODE_ENV}) initialized on port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map