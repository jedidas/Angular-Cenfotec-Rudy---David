import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'stats-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {


  public action: boolean;
  public item: any = {};
  public submitForm: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  private isUpdated = false;

  constructor(
    private readonly fb: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public send() {

    this.isUpdated = true;
    if (this.form.valid) {
      this.submitForm.emit({
        ...this.form.value,
        img: `https://loremflickr.com/320/320/${this.form.value.name.toLowerCase()}`
      });
    }
  }

  private initForm() {

    this.form = this.fb.group({
      id: [0, Validators.required],
      name: ['', [
        Validators.required,
        Validators.min(5)
      ]],
      price: [0, [
        Validators.required,
        Validators.min(1)
      ]],
      description: ['', Validators.required],
      height: [0, [
        Validators.required,
        Validators.min(5)
      ]],
      width: [0, [
        Validators.required,
        Validators.min(5)
      ]],
      weight: [0, [
        Validators.required,
        Validators.min(5)
      ]],
    });

    if (this.item != null && !this.action) {
      this.form.patchValue(this.item);
    }

  }

  public isControlValid(fieldName: string): boolean {
    return this.validateField(this.form.get(fieldName), this.isUpdated);
  }

  public validateField(formControll: AbstractControl | null, isFormSubmitted: boolean): boolean {
    return !!formControll && !((formControll.touched || isFormSubmitted) && formControll.invalid);
  }

}
