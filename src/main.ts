import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  };

  app.enableCors(corsOptions);

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Magi API Service') // Set your API title
    .setDescription(
      'A backend service to track orders and manage location in real time',
    ) // Set a description for your API
    .setVersion('1.0') // Set the version of your API
    .addTag('Methods and endpoints') // Add tags as needed
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document); // You can change 'api-docs' to whatever path you prefer

  await app.listen(process.env.APPLICATION_PORT || 8000);
}

bootstrap();
