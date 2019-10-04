import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'stats-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input()
  public product: any;

  @Output()
  public readonly openModal: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public readonly confirmModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public editProduct(item: any): void {
    this.openModal.emit({
      action: false,
      item
    });
  }

}
