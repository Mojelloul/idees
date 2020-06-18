import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, Module, Logger } from '@nestjs/common';
import { catchError,tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler):Observable<any>{
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
      return next.handle().pipe(
          tap(()=> Logger.log(`${method} ${url} ${Date.now()-now}ms`,context.getClass().name,))
      );
    }



    // intercept(
    //     context:ExecutionContext,
    //     call$ : Observable<any>,
    // ):Observable<any>{
    //     const req = context.switchToHttp().getRequest();
    //     return call$;
    // }

}