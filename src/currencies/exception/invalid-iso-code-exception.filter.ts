import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { InvalidISOCodeException } from './invalid-iso-code.exception';

@Catch(InvalidISOCodeException)
export class InvalidISOCodeFilter implements ExceptionFilter {
  private readonly logger = new Logger(InvalidISOCodeFilter.name);
  catch(exception: InvalidISOCodeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error(exception.message);

    response.status(status).send('Invalid ISO code');
  }
}
