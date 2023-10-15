import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { HttpModule } from '@nestjs/axios';
import { InvalidISOCodeFilter } from './exception/invalid-iso-code-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [HttpModule],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    {
      provide: APP_FILTER,
      useClass: InvalidISOCodeFilter,
    },
  ],
})
export class CurrenciesModule {}
