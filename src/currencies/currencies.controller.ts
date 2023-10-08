import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyDto } from './dto/currency.dto';

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
  async getOneCurrency(@Param('symbol') symbol: string): Promise<CurrencyDto> {
    if (symbol.length !== 3) {
      this.logger.log(`An ISO code must have three letters: ${symbol}`);
      throw new BadRequestException();
    }

    this.logger.log(`REST request to get currency value for: ${symbol}`);
    return this.currenciesService.getCurrency(symbol);
  }
}
