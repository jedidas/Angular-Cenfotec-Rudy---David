import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthenticationService } from '../data-services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SignOffGuard implements CanActivate {

  constructor(private readonly authService: AuthenticationService, private readonly route: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    this.authService.signOff();

    return false;
  }

}
