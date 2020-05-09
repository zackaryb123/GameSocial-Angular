import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AppService} from './app/app.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private errorHandler: AppErrorHandler) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const onLine = navigator.onLine;
    if (!onLine) {
      this.handleError(ErrorMessages.OFFLINE);
      return EMPTY;
    }
    return next.handle(req).pipe(
      tap(
        event => {},
        err => {
          this.handleError(err);
          if (err.status === 404) {
          }
        }
      )
    );
  }

  handleError(error: Error | any) {
    this.errorHandler.handleError(error);
  }
}

export enum ErrorMessages {
  OFFLINE = 'No Connection Available',
  RESPONSE_ERROR = 'Error With Providing Response'
}

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse | any) {
    const appApi = this.injector.get(AppService);
    // if (!DimissedErrors.includes(error.name)) {
    //   const sanitizedError = isYoutubeApiError(error)
    //     ? error.error.error.errors[0]
    //     : error;
    //   console.error('There was an ERROR:', error);
    //   const errorPayload = isString(error) ? { message: error } : error;
    //   appApi.notifyError(error);
    // }
  }
}
