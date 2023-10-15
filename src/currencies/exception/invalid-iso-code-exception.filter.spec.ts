import { Test, TestingModule } from '@nestjs/testing';
import { InvalidISOCodeException } from './invalid-iso-code.exception';
import { InvalidISOCodeFilter } from './invalid-iso-code-exception.filter';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

describe('InvalidISOCodeFilter', () => {
  let filter: InvalidISOCodeFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvalidISOCodeFilter],
    }).compile();

    filter = module.get<InvalidISOCodeFilter>(InvalidISOCodeFilter);
  });

  it('should catch and handle the exception', () => {
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as ArgumentsHost;

    const exception = new InvalidISOCodeException('test');

    filter.catch(exception, mockHost);

    // Verify the expected behavior
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith('Invalid ISO code');
  });
});
