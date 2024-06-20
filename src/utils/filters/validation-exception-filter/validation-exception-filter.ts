import { Response } from 'express';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { message: any; error: string };

    let validationErrors = [];

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse.message &&
      Array.isArray(exceptionResponse.message)
    ) {
      validationErrors = exceptionResponse.message.map((error) => {
        if (typeof error === 'string') {
          return { field: error.split(' ')[0], message: error };
        }
        return error;
      });
    }

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }
}
