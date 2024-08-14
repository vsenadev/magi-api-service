import { BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

export class ValidationException extends BadRequestException {
  constructor(public readonly errors: ZodError) {
    super(ValidationException.formatErrors(errors));
  }

  private static formatErrors(errors: ZodError): string {
    return errors.errors
      .map((err) => `${err.path.join(' -> ')}: ${err.message}`)
      .join(', ');
  }
}
