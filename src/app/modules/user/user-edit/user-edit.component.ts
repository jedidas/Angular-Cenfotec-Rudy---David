import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { CONFIG } from 'src/app/config';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'stats-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

  public action: boolean;
  public user: any = {};
  public submitForm: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  private isUpdated = false;
  public errorMessage = '';

  public send() {

    this.isUpdated = true;
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  constructor(
    private readonly fb: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {

    this.initForm();

  }

  private initForm(): void {

    this.form = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      email: ['',
      [
        Validators.required,
        Validators.pattern(CONFIG.patterns.email),
        Validators.maxLength(25)
      ]
      ],
      password: ['', Validators.required],
      re_password: ['', Validators.required]
    }, {
      validator: MustMatch('password', 're_password')
    });

    if (this.user != null && !this.action) {
      this.user.re_password = this.user.password;
      this.form.patchValue(this.user);
    }

  }

  public isControlValid(fieldName: string): boolean {
    return this.validateField(this.form.get(fieldName), this.isUpdated);
  }

  public validateField(formControll: AbstractControl | null, isFormSubmitted: boolean): boolean {
    return !!formControll && !((formControll.touched || isFormSubmitted) && formControll.invalid);
  }

}
