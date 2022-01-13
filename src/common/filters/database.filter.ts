import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class DatabaseKnownExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.BAD_REQUEST).json({
          errorCode: exception.code,
          message: 'Some entries already exist',
          invalidEntries: exception.meta,
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception);
    }
  }
}
