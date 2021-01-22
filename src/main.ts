import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Basic Auth API')
    .setDescription('A basic nestjs API with user auth implemented')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('apidocs', nestApp, document);

  await nestApp.listen(3000);
}

bootstrap();
