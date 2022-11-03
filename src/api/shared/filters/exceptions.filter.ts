import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { getRequest } from '../utils';

export type Exceptions = HttpException;

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: Exceptions, host: ArgumentsHost) {
    const request = getRequest<Request>(host);

    const statusCode = this.isHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = {
      statusCode,
      error: 'Error',
      message: exception.message,
      timestamp: Date.now() / 1000,
    };

    const error = exception.getResponse()

    if (typeof error === 'string') {
      response.message = error;
    } else {
      Object.assign(response, error);
    }

    switch (host.getType()) {
      case 'http':
        host.switchToHttp().getResponse().status(statusCode).json(response);
        break;

      case 'ws':
        const callback = host.getArgByIndex(2);

        if (typeof callback === 'function') {
          callback(response);
        }

        request.emit('exception', response);
        break;

      default:
        break;
    }

    return response;
  }

  isHttpException(err: Exceptions): err is HttpException {
    return err instanceof HttpException;
  }
}
