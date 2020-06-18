import {Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger} from '@nestjs/common'

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exeption: HttpException, host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response =ctx.getResponse();
        const request =ctx.getRequest();
        const status= exeption.getStatus();
        const errorResponse={
            code:status,
            timestamp: new Date().toLocaleDateString(),
            path:request.url,
            method:request.method,
            message: exeption.message ||  null,
        };
        
        Logger.error(`${request.methode} ${request.url}`,
        JSON.stringify(errorResponse),
        'ExeptionFilter');
        response.status(status).json(errorResponse);
    }
}