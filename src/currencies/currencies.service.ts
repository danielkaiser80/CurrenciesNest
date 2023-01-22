import { Injectable, Logger } from '@nestjs/common';
import { CurrencyDto } from './dto/currency.dto';
import { DateTime } from 'luxon';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  private currencies: Array<CurrencyDto> = [];

  private retrievalDate = DateTime.now();

  constructor(private http: HttpService) {}

  private currenciesNeedToBeUpdated(): boolean {
    return this.currencies.length === 0 || this.retrievalDate < DateTime.now();
  }

  async getAllCurrencies() {
    if (this.currenciesNeedToBeUpdated()) {
      this.logger.log('New currencies needed, retrieving...');
      this.logger.log(await lastValueFrom(this.loadCurrenciesFromEcb()));
    }

    return this.currencies;
  }

  private loadCurrenciesFromEcb(): Observable<string> {
    return this.http
      .get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
      .pipe(map((res) => res.data));
  }
}
