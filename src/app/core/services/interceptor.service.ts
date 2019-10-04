import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { reduce, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../data-services/authentication.service';
import { CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private readonly authServices: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = this.generateHeaders(req);

    const authReq = this.addHeader(req, headers);

    return next.handle(authReq).pipe(
      catchError(response => {
        return throwError(response);
      })
    );

  }

  private addHeader(req: HttpRequest<any>, headers: HttpHeaders): HttpRequest<any> {

    return req.clone({
      headers
    });

  }

  private generateHeaders(req: HttpRequest<any>): HttpHeaders {

    const { access_token } = this.authServices.authUser() ? this.authServices.authUser() : CONFIG.settings;
    const headers = req.headers.set('Authorization', 'Bearer ' + access_token);
    return headers;

  }

}
