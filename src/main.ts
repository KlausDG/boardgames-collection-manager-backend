import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './utils/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  // The timeout value for sockets
  server.setTimeout(2 * 60 * 10000);
  // The number of milliseconds of inactivity a server needs to wait for additional incoming data
  server.keepAliveTimeout = 30000;
  // Limit the amount of time the parser will wait to receive the complete HTTP headers
  server.headersTimeout = 31000;

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new ValidationExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Boardgame Collection Manager')
    .setDescription('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
