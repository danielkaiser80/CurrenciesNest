import { Controller, Get, Logger, Param, UseFilters } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyDto } from './dto/currency.dto';
import { InvalidISOCodeException } from './exception/invalid-iso-code.exception';
import { InvalidISOCodeFilter } from './exception/invalid-iso-code-exception.filter';

@Controller('currencies')
export class CurrenciesController {
  private readonly logger = new Logger(CurrenciesController.name);

  constructor(private readonly currenciesService: CurrenciesService) {}

  /**
   * Fetch all currencies.
   */
  @Get()
  getAllCurrencies(): Promise<Array<CurrencyDto>> {
    this.logger.log('REST request to get all currencies');
    return this.currenciesService.getAllCurrencies();
  }

  /**
   * Fetch a particular currency.
   * @param symbol the ISO code, for which the currency should be fetched.
   */
  @Get('/:symbol')
  @UseFilters(InvalidISOCodeFilter)
  async getOneCurrency(@Param('symbol') symbol: string): Promise<CurrencyDto> {
    if (symbol.length !== 3) {
      const errorMessage = `An ISO code must have three letters: ${symbol}`;
      throw new InvalidISOCodeException(errorMessage);
    }

    this.logger.log(`REST request to get currency value for: ${symbol}`);
    return this.currenciesService.getCurrency(symbol);
  }
}
