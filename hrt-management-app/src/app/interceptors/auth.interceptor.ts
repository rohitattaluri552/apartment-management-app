import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedUrl = req.clone({
      url: `${environment.baseUrl}${req.url}`,
    });
    return next.handle(modifiedUrl);
  }
}
