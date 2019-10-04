import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/data-services/products.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductConfirmComponent } from '../product-confirm/product-confirm.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'stats-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit {

  private bsModalRef: BsModalRef;
  public products: any[] = [];
  public returnedArray: any[] = [];

  public totalItems = this.products.length;
  public currentPage = 1;
  public page: number;
  public itemsPerPage = 5;

  constructor(
    private modalService: BsModalService,
    private readonly productsService: ProductsService
  ) { }

  ngOnInit() {

    this.get();

  }

  public get() {
    this.productsService.get().subscribe((success: any) => {

      this.products = success;
      // this.returnedArray = this.products;
      this.pageChanged({
        itemsPerPage: this.itemsPerPage,
        page: this.currentPage
      });
      console.log('success', success);

    }, (error) => {

      console.log('error', error);

    });
  }

  public confirmModal(item: any): void {

    const initialState = {
      item
    };

    this.bsModalRef = this.modalService.show(ProductConfirmComponent, { initialState });
    this.bsModalRef.content.deleteItem.subscribe(this.delete.bind(this));

  }

  public openModal(data: any): void {

    const initialState = {
      action: data.action,
      item: data.item
    };

    this.bsModalRef = this.modalService.show(ProductEditComponent, { initialState });
    this.bsModalRef.content.submitForm.subscribe((result: any) => {

      this.createUpdate(data.action, result);

    });

  }

  private delete(id: any): void {

    console.log('Delete Item request', id);


    this.productsService.delete(id).subscribe((result: any) => {
      this.get();
    },
      (error: any) => {
        console.log('error', error);
      },
      () => {
        console.log('Final');
        this.bsModalRef.hide();
      });
  }

  private createUpdate(action: boolean, item: any): void {

    if (action) {

      this.productsService.create(item).subscribe(
        (result: any) => {
          this.get();
        },
        (error: any) => {
          console.log('error', error);
        },
        () => {
          console.log('Final');
          this.bsModalRef.hide();
        });

    } else {
      this.productsService.update(item).subscribe(
        (result: any) => {
          this.get();
        },
        (error: any) => {
          console.log('error', error);
        },
        () => {
          console.log('Final');
          this.bsModalRef.hide();
        });
    }

  }

  public pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.products.slice(startItem, endItem);
  }

  private search(searchText: string = '') {
    searchText.toLowerCase();
    return this.products.filter((it) => {
      return it.name.toLowerCase().includes(searchText);
    });
  }


}
