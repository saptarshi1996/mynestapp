import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger, ValidationPipe } from '@nestjs/common';

import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payload to DTO instances
      whitelist: true, // Strip properties not in the DTO
      forbidNonWhitelisted: true, // Throw errors if properties are not in the DTO
    }),
  );

  new Logger().log(process.env.JWT_SECRET);

  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Learn nest')
    .setDescription('Learn nest')
    .setVersion('1.0')
    .addTag('Learn')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
