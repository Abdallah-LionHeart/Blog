import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../appService/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  forgotPasswordForm: FormGroup;
  emailExists: boolean | null = null;
  emailSent: boolean = false;


  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // resetPasswordRequest() {
  //   this.accountService.resetPasswordRequest(this.forgotPasswordForm.value).subscribe({
  //     next: () => {
  //       setTimeout(() => {
  //         this.router.navigate(['/login']);
  //       }, 3000);
  //     },
  //     error: error => {
  //       console.log(error);
  //     }
  //   });
  // }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.accountService.resetPasswordRequest(this.forgotPasswordForm.controls['email'].value).subscribe({
      next: () => {
        this.emailSent = true;
        setTimeout(() => {
          this.router.navigate(['/login'], { queryParams: { email: this.forgotPasswordForm.controls['email'].value } });
        }, 3000);
      },
      error: error => {
        console.log(error);
      }

    });
  }

  initializeForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPasswordForm.controls['email'].valueChanges.subscribe(value => {
      this.checkEmailExists(value);
    });
  }


  checkEmailExists(email: string) {
    if (email && this.forgotPasswordForm.controls['email'].valid) {
      this.accountService.checkEmailExists(email).subscribe({
        next: (exists: boolean) => {
          this.emailExists = exists;
        },
        error: () => {
          this.emailExists = false;
        }
      });
    } else {
      this.emailExists = null;
    }
  }

}
