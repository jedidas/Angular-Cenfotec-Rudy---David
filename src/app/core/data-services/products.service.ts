import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient: HttpClient,
    private readonly authenticationService: AuthenticationService
  ) { }

  public get(): any {
    return this.httpClient.get(`${CONFIG.api}products`).pipe(catchError(this.handleError('addCustomer')));
  }

  public create(item: any): any {
    return this.httpClient.post(`${CONFIG.api}products`, item).pipe(catchError(this.handleError('addCustomer')));
  }

  public update(item: any): any {
    return this.httpClient.patch(`${CONFIG.api}products/${item.id}`, item).pipe(catchError(this.handleError('addCustomer')));
  }

  public delete(item: any): any {
    return this.httpClient.delete(`${CONFIG.api}products/${item}`, item).pipe(catchError(this.handleError('addCustomer')));
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      if (error.status === 401) {
        this.authenticationService.signOff();
      }


      return throwError(
        new Error(
          `${operation} failed: ${error.message}`
        )
      );

    };
  }

}
