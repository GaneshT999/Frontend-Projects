import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service.service';
import { RegisterService } from 'src/app/services/register.service';

class customEmail {
  static emailDomain(control: AbstractControl): { [key: string]: any } | null {
    const emailId: string = control.value;
    const domain = emailId.substring(emailId.lastIndexOf('@') + 1);

    if (emailId === '') {
      return { emailDomain: true };
    }
    if (domain.toLowerCase() === 'TG.com') {
      return null;
    } else {
      return { emailDomain: true };
    }
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginError: any;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          if (data.status === 200 && !data.body?.ErrorCode) {
            this.router.navigate(['/home']);
          } else {
            this.loginError = data.body?.message;
          }
        },
        (error) => (this.loginError = error)
      );
    }
  }
}
