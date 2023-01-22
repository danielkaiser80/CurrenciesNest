import { Injectable, Logger } from '@nestjs/common';
import { CurrencyDto } from './dto/currency.dto';
import { DateTime } from 'luxon';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  private currencies: Array<CurrencyDto> = [];

  private retrievalDate = DateTime.now();

  private currenciesNeedToBeUpdated(): boolean {
    return this.currencies.length === 0 || this.retrievalDate < DateTime.now();
  }

  getAllCurrencies() {
    if (this.currenciesNeedToBeUpdated()) {
      this.logger.log('New currencies needed, retrieving...');
      // this.loadCurrenciesFromEcb();
    }

    return this.currencies;
  }
}
