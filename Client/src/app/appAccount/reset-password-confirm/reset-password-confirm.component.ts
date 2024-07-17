import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/appService/account.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent {
  reseConfirmForm!: FormGroup;
  changeType: boolean = true;
  visible: boolean = true;
  resetSuccess: boolean = false;
  model: any = {};

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    // this.reseConfirmForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   code: ['', [Validators.required]],
    //   newPassword: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  initializeForm() {
    this.reseConfirmForm = this.fb.group({
      confirmCode: ['', Validators.required],
      newpassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('newpassword')]],
    });

    this.reseConfirmForm.controls['newpassword'].valueChanges.subscribe(() => {
      this.reseConfirmForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    };
  }


  resetPasswordConfirm() {
    this.accountService.resetPasswordConfirm(this.reseConfirmForm.value).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
