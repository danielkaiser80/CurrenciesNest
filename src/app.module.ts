import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CurrenciesController } from './currencies/currencies.controller';
import { CurrenciesService } from './currencies/currencies.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CurrenciesController],
  providers: [CurrenciesService],
})
export class AppModule {}
