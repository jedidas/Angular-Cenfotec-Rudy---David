import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'stats-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.sass']
})
export class UserItemComponent implements OnInit {

  @Input()
  public user: any;

  @Output()
  public readonly openModal: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public readonly confirmModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public edit(item: any): void {
    this.openModal.emit({
      action: false,
      item
    });
  }

}
