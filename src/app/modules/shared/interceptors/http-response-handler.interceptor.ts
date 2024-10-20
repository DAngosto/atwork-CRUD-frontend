import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class HttpResponseHandlerInterceptor implements HttpInterceptor {
  private messageService: MessageService = inject(MessageService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request.clone()).pipe(
      tap((_event) => {}),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status >= 400 && errorResponse.status < 500) {
          const error = errorResponse.error;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
          });
        }
        return throwError(() => errorResponse);
      })
    );
  }

  isErrorResponse(obj: any) {
    return obj && obj.statusCode && obj.message;
  }
}
