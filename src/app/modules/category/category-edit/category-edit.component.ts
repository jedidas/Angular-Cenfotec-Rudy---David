import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriesService } from 'src/app/core/data-services/categories.service';

@Component({
  selector: 'stats-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.sass']
})
export class CategoryEditComponent implements OnInit {

  public form: FormGroup;
  public item: any = {};
  public action: boolean;
  public createState = true;
  private isUpdated = false;
  public errorMessage = '';



  public formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private readonly categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(
      'item', this.item
    );

  }

  public createUpdateCategory() {


    this.isUpdated = true;

    if (this.form.valid) {

      console.log('action', this.action);
      if (this.action) {

        this.categoriesService.create(this.form.value).subscribe((data) => {
          console.log('SUCCESS', data);
          this.formSubmit.emit();
        },
          (error) => {
            console.log('ERROR', error);

          }
        );
      }
      else {

        this.categoriesService.update(this.form.value).subscribe((data) => {
          console.log('SUCCESS', data);
          this.formSubmit.emit();
        },
          (error) => {
            console.log('ERROR', error);

          }
        );
      }
    }
    console.log(
      'AFUERA ENVIO',
      this.form.value,
    );



  }



  private initForm(): void {

    this.form = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
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
