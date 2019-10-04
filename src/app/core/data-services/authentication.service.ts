import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { LocalstorageService } from '../services/localstorage.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public login(user: any): any {

    return this.httpClient.post(`${CONFIG.api}auth/login`, user).pipe(catchError(this.handleError('addCustomer')));

  }

  public register(user: any): any {

    return this.httpClient.post(`${CONFIG.api}auth/register`, user).pipe(catchError(this.handleError('addCustomer')));

  }

  public isLoggedIn(): boolean {

    const authUser = this.localstorage.get('authUser');

    if (authUser !== null) {
      CONFIG.settings.access_token = authUser.access_token;
    }

    return !(CONFIG.settings.access_token === '');

  }

  public signOff(): void {

    CONFIG.settings.access_token = '';
    this.localstorage.delete('authUser');

  }

  public authUser() {
    return this.localstorage.get('authUser');
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      if (error.status === 401) {
        this.signOff();
      }

      return throwError(
        new Error(
          `${operation} failed: ${error.message}`
        )
      );

    };
  }

  constructor(private httpClient: HttpClient, private readonly localstorage: LocalstorageService) { }
}
