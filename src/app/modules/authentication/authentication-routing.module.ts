import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOffGuard } from 'src/app/core/guards/sign-off.guard';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LogInComponent
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignUpComponent
  },
  {
    path: 'signoff',
    canActivate: [SignOffGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
