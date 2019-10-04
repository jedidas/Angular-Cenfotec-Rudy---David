import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'users'
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
