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
  loginForm!: FormGroup;
  changeType: boolean = true;
  visible: boolean = true;
  confirmationCodeSent = false;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.confirmationCodeSent = true;
        setTimeout(() => {
          this.router.navigate(['/confirm-login'], { queryParams: { email: this.loginForm.controls['email'].value } });
        }, 3000);
      }
    })
  }
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }



}
