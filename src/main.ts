import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: {origin: "http://localhost:3000", credentials: true}

  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Ocso Api')
    .setDescription('Api for ocso management')
    .setVersion('0.8')
    .addBearerAuth()
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(3002);
}
bootstrap();
