// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './App.module';
// import * as dotenv from 'dotenv';
//
// dotenv.config();
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//
//   app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader(
//       'Access-Control-Allow-Origin',
//       '*' || process.env.CORS_ORIGIN,
//     );
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//     );
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//     );
//     if (req.method === 'OPTIONS') {
//       res.status(200).end();
//       return;
//     }
//     next();
//   });
//
//   await app.listen(process.env.APPLICATION_PORT || 5000);
// }
//
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/App.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
