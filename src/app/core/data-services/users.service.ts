import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
    private readonly authenticationService: AuthenticationService
    ) { }

  public list(): any {
    return this.httpClient.get(`${CONFIG.api}users`).pipe(catchError(this.handleError('addCustomer')));
  }

  public create(user: any): any {

    return this.httpClient.post(`${CONFIG.api}users`, user).pipe(catchError(this.handleError('addCustomer')));

  }

  public update(user: any): any {
    return this.httpClient.patch(`${CONFIG.api}users/${user.id}`, user).pipe(catchError(this.handleError('addCustomer')));
  }

  public delete(id: any): any {
    return this.httpClient.delete(`${CONFIG.api}users/${id}`, id).pipe(catchError(this.handleError('addCustomer')));
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

      // return of(result as T);

    };
  }

}
