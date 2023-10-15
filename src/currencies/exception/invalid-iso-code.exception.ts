import { BadRequestException } from '@nestjs/common';

export class InvalidISOCodeException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
