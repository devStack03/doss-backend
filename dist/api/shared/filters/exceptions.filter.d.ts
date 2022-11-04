import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare type Exceptions = HttpException;
export declare class ExceptionsFilter implements ExceptionFilter {
    catch(exception: Exceptions, host: ArgumentsHost): {
        statusCode: number;
        error: string;
        message: string;
        timestamp: number;
    };
    isHttpException(err: Exceptions): err is HttpException;
}
