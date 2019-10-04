import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoriesService } from 'src/app/core/data-services/categories.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryEditComponent } from '../category-edit/category-edit.component';


@Component({
  selector: 'stats-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  private bsModalRef: BsModalRef;
  public categories: any = [];

  constructor(
    private readonly categoryService: CategoriesService,
    private modalService: BsModalService
  ) { }

  public openModal(action: boolean, item: any): void {

    console.log('openModal', action, item);
    const initialState = {
      action: action,
      item: item
    };

    console.log('ProductEditComponent');


    this.bsModalRef = this.modalService.show(CategoryEditComponent, { initialState });
    this.bsModalRef.content.formSubmit.subscribe((success) => {
      console.log('LLEGO');
      this.initComponent();
      this.bsModalRef.hide();
    });

  }

  public initComponent(): void {

    this.categoryService.listCategory().subscribe(
      (result: any) => {
        console.log(result);
        this.categories = result;
      },


      (error: any) => {
        console.error(error);
      }
    );

  }

  public deleteCat(id: number): void {

    if (window.confirm("Desea eliminar categoria?")) {
      this.categoryService.delete(id).subscribe(
        (result: any) => {
          this.initComponent();
        },


        (error: any) => {
          console.error(error);
        }
      );
    }


  }



  ngOnInit() {
    this.initComponent();
  }

}
