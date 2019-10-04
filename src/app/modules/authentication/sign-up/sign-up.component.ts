import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CONFIG } from 'src/app/config';
import { AuthenticationService } from 'src/app/core/data-services/authentication.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'stats-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;

  public errorMessage = '';

  //Local State
  private isSubmitted: boolean = false;

  constructor(
    private readonly route: Router,
    private readonly fb: FormBuilder,
    private readonly authentication: AuthenticationService,
    private readonly localstorage: LocalstorageService
  ) {

  }

  ngOnInit() {

    this.initForm();

  }

  private initForm(): void {

    this.form = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern(CONFIG.patterns.email),
          Validators.maxLength(25)
        ]
      ],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  public signIn(): void {

    this.isSubmitted = true;

    if (this.form.valid) {

      this.authentication.register(this.form.value).subscribe(
        (arg) => {

          if (arg === undefined || arg === null || arg === false) {
            return false;
          } else {

            CONFIG.settings.access_token = arg.access_token;

            const dataUser = {
              name: this.form.value.name,
              email: this.form.value.email,
              access_token: arg.access_token
            };

            this.localstorage.set('authUser', dataUser);
            this.errorMessage = '';
            this.route.navigate(['/']);

          }

        },
        (error) => {

          console.log('HTTP Error', error, error.error.message);
          this.errorMessage = error.error.message;

        },
        () => {
          console.log('HTTP request completed.');
        });

    }

  }

  public isControlValid(fieldName: string): boolean {
    return this.validateField(this.form.get(fieldName), this.isSubmitted);
  }

  public validateField(formControll: AbstractControl | null, isFormSubmitted: boolean): boolean {
    return !!formControll && !((formControll.touched || isFormSubmitted) && formControll.invalid);
  }

}
