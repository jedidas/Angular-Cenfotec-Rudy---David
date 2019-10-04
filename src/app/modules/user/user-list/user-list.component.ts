import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/core/data-services/users.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserConfirmComponent } from '../user-confirm/user-confirm.component';

@Component({
  selector: 'stats-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  private bsModalRef: BsModalRef;
  private modalRef: BsModalRef | null;
  public users: any[] = [];
  public currentUser: any = {};
  public createState: boolean;
  public totalItems = this.users.length;
  public currentPage = 1;
  public page: number;
  public itemsPerPage = 5;
  public returnedArray: any[] = [];

  constructor(
    private modalService: BsModalService,
    private readonly usersService: UsersService,
    private readonly route: Router
  ) { }


  public getUserFilter() {

    let counter = 1;
    return this.users.filter((item, index) => {
      if (counter <= this.itemsPerPage) {
        counter++;
        if (index < (this.currentPage * this.itemsPerPage)) {

        } else {
          return item;
        }
      }

    });

  }

  public changingItemsPerPage(value: any): void {

    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.returnedArray = this.users.slice(startItem, endItem);

  }



  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: PageChangedEvent): void {

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.users.slice(startItem, endItem);

  }

  public confirmModal(item: any): void {

    const initialState = {
      item
    };

    this.bsModalRef = this.modalService.show(UserConfirmComponent, { initialState });
    this.bsModalRef.content.deleteItem.subscribe(this.delete.bind(this));

  }

  public openModal(data: any): void {

    const initialState = {
      action: data.action,
      user: data.item
    };

    this.bsModalRef = this.modalService.show(UserEditComponent, { initialState });
    this.bsModalRef.content.submitForm.subscribe((result: any) => {

      this.createUpdate(data.action, result);

    });

  }

  public openAlert(template: TemplateRef<any>, user: any): void {

    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.currentUser = user;

  }

  ngOnInit() {
    this.loadUsers();
  }

  public loadUsers(): void {

    this.usersService.list().subscribe((arg) => {
      this.users = arg;
      this.changingItemsPerPage(0);

    },
      (error) => {

        console.log('HTTP Error', error, error.error.message);

        const errorResponse = [401];

        if (errorResponse.includes(error.status)) {

          this.route.navigate(['/signoff']);

        }


      },
      () => {
        console.log('HTTP request completed.');
      });

  }

  public hide(): void {
    this.modalRef.hide();
    this.currentUser = {};
  }

  public get(): any {
    return this.currentUser;
  }

  private delete(id: any): void {

    console.log('Delete Item request', id);


    this.usersService.delete(id).subscribe((result: any) => {
      this.loadUsers();
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

      this.usersService.create(item).subscribe(
        (result: any) => {
          this.loadUsers();
        },
        (error: any) => {
          console.log('error', error);
        },
        () => {
          console.log('Final');
          this.bsModalRef.hide();
        });

    } else {
      this.usersService.update(item).subscribe(
        (result: any) => {
          this.loadUsers();
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

}
