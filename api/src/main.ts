import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  console.log("PORT >>>>>>>>>>>>>>>> ", process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();