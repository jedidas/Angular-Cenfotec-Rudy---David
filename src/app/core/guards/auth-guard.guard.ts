import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthenticationService } from '../data-services/authentication.service';
import { CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthenticationService, private readonly route: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.isLoggedIn() && !CONFIG.notLoginRoutes.includes(next.routeConfig.path)) {
      return true;
    }

    if (!this.authService.isLoggedIn() && CONFIG.notLoginRoutes.includes(next.routeConfig.path)) {
      return true;
    }

    this.route.navigate(['/'], {
      queryParams: {
        redirectTo: state.url
      }
    });

    return false;

  }

}
