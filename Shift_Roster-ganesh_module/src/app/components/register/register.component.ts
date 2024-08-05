import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/data';
import { RegisterService } from 'src/app/services/register.service';
import { loc } from 'src/app/data';
import { lev } from 'src/app/data';

/* **Custon Functions** */

export class customEmail {
  static emailDomain(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const domain = email?.substring(email.lastIndexOf('@') + 1);

    if (email === '') {
      return { emailDomain: true };
    }
    if (domain?.toLowerCase() === 'TG.com') {
      return null;
    } else {
      return { emailDomain: true };
    }
  }
}
export class CustomValidators {
  constructor() {}

  static onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z ]*$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { onlyChar: true };
      }
    };
  }
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
/***Custom Functions end** */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user: User = new User();
  data = false;
  UserForm: any;
  massage: any;
  options = ['a', 'b', 'c', 'd'];
  /*registrationForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required ]),
      email: new FormControl('', [Validators.required , customEmail.emailDomain]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },

    CustomValidatorsService.mustMatch('password','confirmPassword')
  );*/
  loc = loc;

  lev = lev;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        location: ['', Validators.required],
        level: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            customEmail.emailDomain,
            Validators.pattern(
              '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
            ),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: CustomValidators.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  userRegister() {
    console.log(this.registrationForm.value);
    this.registerService
      .CreateUser(this.registrationForm.value)
      .subscribe(() => {
        this.data = true;
        this.massage = 'Data saved Successfully';
        this.registrationForm.reset();
      });
  }
}
