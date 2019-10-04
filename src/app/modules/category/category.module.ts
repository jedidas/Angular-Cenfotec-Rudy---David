import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent, CategoryEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    CategoryEditComponent
  ]
})
export class CategoryModule { }
