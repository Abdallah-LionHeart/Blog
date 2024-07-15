import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/appService/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isCodeSent = false;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      code: ['']
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.accountService.login(email, password).subscribe(() => {
      this.isCodeSent = true;
    });
  }

  confirmLogin() {
    const { email, password, code } = this.loginForm.value;
    this.accountService.confirmLogin(email, password, code).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
