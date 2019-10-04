import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductConfirmComponent } from './product-confirm/product-confirm.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [ProductsListComponent, ProductItemComponent, ProductEditComponent, ProductConfirmComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    ModalModule.forRoot(),
    PaginationModule
  ],
  entryComponents: [
    ProductEditComponent,
    ProductConfirmComponent
  ]
})
export class ProductsModule { }
