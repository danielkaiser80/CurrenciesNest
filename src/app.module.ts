import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [ConfigModule.forRoot(), CurrenciesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
