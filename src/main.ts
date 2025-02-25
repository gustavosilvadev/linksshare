import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { appModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(appModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
