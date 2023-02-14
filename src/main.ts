import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors({ origin: configService.get('ORIGIN') });
  await app.listen(port);
};

// noinspection JSIgnoredPromiseFromCall
bootstrap();
