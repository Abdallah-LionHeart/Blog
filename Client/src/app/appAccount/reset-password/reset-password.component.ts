import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../appService/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetRequestForm: FormGroup;
  resetConfirmForm: FormGroup;
  isCodeSent = false;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.resetRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetConfirmForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  sendResetCode() {
    const { email } = this.resetRequestForm.value;
    this.accountService.resetPasswordRequest(email).subscribe(() => {
      this.isCodeSent = true;
    });
  }

  resetPassword() {
    const { email, code, newPassword } = this.resetConfirmForm.value;
    this.accountService.resetPasswordConfirm(email, code, newPassword).subscribe(() => {
      // Handle success
    });
  }

}
