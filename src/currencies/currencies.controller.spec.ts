import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        CurrenciesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => {
              return of({
                data: fs.readFileSync(
                  path.resolve(__dirname, 'currencies.xml'),
                  'utf8',
                ),
              });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all currencies', async () => {
    expect(await controller.getAllCurrencies()).toStrictEqual([
      { isoCode: 'USD', value: '1.0826' },
      { isoCode: 'JPY', value: '140.86' },
      { isoCode: 'BGN', value: '1.9558' },
      { isoCode: 'CZK', value: '23.922' },
      { isoCode: 'DKK', value: '7.4391' },
      { isoCode: 'GBP', value: '0.87600' },
      { isoCode: 'HUF', value: '395.88' },
      { isoCode: 'PLN', value: '4.7100' },
      { isoCode: 'RON', value: '4.9258' },
      { isoCode: 'SEK', value: '11.1655' },
    ]);
  });
});
