import { Injectable, Logger } from '@nestjs/common';
import { CurrencyDto } from './dto/currency.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { xml2json } from 'xml-js';
import { LocalDate } from '@js-joda/core';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  private currencies: Array<CurrencyDto> = [];

  private retrievalDate = LocalDate.now();

  constructor(private http: HttpService) {}

  async getAllCurrencies() {
    if (this.currenciesNeedToBeUpdated()) {
      this.logger.log('New currencies needed, retrieving...');
      await this.loadCurrenciesFromEcb();
    }

    return this.currencies;
  }

  async getCurrency(isoCode: string) {
    if (isoCode.toUpperCase() === 'EUR') {
      return { isoCode, value: 1 };
    }

    if (this.currenciesNeedToBeUpdated()) {
      this.logger.log('New currencies needed, retrieving...');
      await this.loadCurrenciesFromEcb();
    }

    return this.currencies.filter(
      (currencyDto) =>
        currencyDto.isoCode.localeCompare(isoCode, undefined, {
          sensitivity: 'accent',
        }) === 0,
    )[0];
  }

  private currenciesNeedToBeUpdated(): boolean {
    return (
      this.currencies.length === 0 ||
      this.retrievalDate.isBefore(LocalDate.now())
    );
  }

  private async loadCurrenciesFromEcb() {
    const observable = this.http
      .get<string>(
        'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
      )
      .pipe(
        map((res) => res.data),
        map((xml: string) => xml2json(xml, { compact: true, spaces: 4 })),
        map((json) => JSON.parse(json)),
        // remove XML header and preface
        map((res) => res['gesmes:Envelope'].Cube.Cube),
        map((cube) => {
          // TODO should probably handle the time information we got; also the weekends
          // might be interesting
          this.logger.log(
            `Retrieved new currencies for ${cube['_attributes'].time}`,
          );
          return cube.Cube;
        }),
        map(
          (cube: Array<{ _attributes: { currency: string; rate: number } }>) =>
            cube
              .map((value) => value['_attributes'])
              .map(({ currency, rate }) => ({
                isoCode: currency,
                value: rate,
              })),
        ),
      );

    this.currencies = await lastValueFrom(observable);
    // should probably store also the date which we log above
    this.retrievalDate = LocalDate.now();
  }
}
