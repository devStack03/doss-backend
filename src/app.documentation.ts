import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Auto-generates api documentation using @nestjs/swagger.
 * @param app  : instance
 */
const setupDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Doss-Backend API')
    .setDescription(
      'Web api offering data to the Gro mobile front application.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  // writes the generated specs file
  // fs.writeFileSync("./src/main-swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api/doc', app, document);
};
export default setupDocumentation;