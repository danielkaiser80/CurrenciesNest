import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';

interface CurrencyDto {
  isoCode: string;
  value: number;
}

@Controller('currencies')
export class CurrenciesController {
  private readonly logger = new Logger(CurrenciesController.name);
  @Get()
  getAllCurrencies(): Array<unknown> {
    this.logger.log('REST request to get all currencies');
    // TODO need to load the currencies here
    return [];
  }

  /**
   * Fetch a particular currency.
   * @param symbol the ISO code, for which the currency should be fetched.
   */
  @Get('/:symbol')
  async getOneCurrency(@Param('symbol') symbol: string): Promise<CurrencyDto> {
    if (symbol.length != 3) {
      this.logger.log(`An ISO code must have three letters: ${symbol}`);
      throw new BadRequestException();
    }

    this.logger.log(`REST request to get currency value for: ${symbol}`);
    // TODO implement
    //return this.currencyLoader.getCurrency(symbol);
    return { isoCode: symbol, value: 0 };
  }
}
