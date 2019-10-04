import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserConfirmComponent } from './user-confirm/user-confirm.component';

@NgModule({
  declarations: [
    UserListComponent, UserEditComponent, UserItemComponent, UserConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ModalModule.forRoot(),
    PaginationModule
  ],
  entryComponents: [
    UserEditComponent,
    UserConfirmComponent
  ]
})
export class UserModule { }
