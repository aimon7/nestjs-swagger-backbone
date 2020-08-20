import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Selinium API')
    .setDescription('The test API for Selinium-adapter')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Something')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('apidocs', nestApp, document);

    await nestApp.listen(3000);
}

bootstrap();
