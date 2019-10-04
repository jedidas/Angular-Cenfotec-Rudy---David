import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpRequest: HttpClient,
    private readonly authenticationService: AuthenticationService

    ) { }

  public listCategory(): any{
    return this.httpRequest.get(`${CONFIG.api}categories`);
  }

  
  public create(category:any):any {
    console.log('CREATE', category);
    
    return this.httpRequest.post(`${CONFIG.api}categories`, category );
  }

  public update(item: any): any {
    console.log('update',item);
    
    return this.httpRequest.patch(`${CONFIG.api}categories/${item.id}`, item).pipe(catchError(this.handleError('addCustomer')));
  }
  public delete(id: any): any {
    return this.httpRequest.delete(`${CONFIG.api}categories/${id}`, id).pipe(catchError(this.handleError('addCustomer')));
  }


  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      this.authenticationService.signOff();

      return throwError(
        new Error(
          `${operation} failed: ${error.message}`
        )
      );
      // return of(result as T);
    };
  }

}
