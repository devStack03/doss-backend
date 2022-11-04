"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const setupDocumentation = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Doss-Backend API')
        .setDescription('Web api offering data to the Gro mobile front application.')
        .setVersion('1.0')
        .addBearerAuth({
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
    }, 'access-token')
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api/doc', app, document);
};
exports.default = setupDocumentation;
//# sourceMappingURL=app.documentation.js.map