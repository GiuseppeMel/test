import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../../service/spinner/spinner.service';

/**
 * Context token that can be set to `false` to prevent the loader from showing for a
 * particular request.
 */
export const IS_LOADER_ENABLED = new HttpContextToken<boolean>(() => true);

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private _spinnerService: SpinnerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(IS_LOADER_ENABLED)) {
      this._spinnerService.show();
      return next.handle(request).pipe(
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 500)
        })
      );
    }
    return next.handle(request);
  }
}
