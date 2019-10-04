import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, TranslateModule.forChild()
  ],
  exports: [
    TranslateModule,
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
