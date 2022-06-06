import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'client/public'));
  app.useStaticAssets(join(__dirname, '..', 'client/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'client/views'));
  app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();
