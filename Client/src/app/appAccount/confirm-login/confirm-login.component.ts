import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/appService/account.service';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss']
})
export class ConfirmLoginComponent {
  confirmCodeForm!: FormGroup;
  confirmationSuccess: boolean = false;
  codeSent: boolean = false;
  countdown: number = 60;
  countdownInterval: any;

  email!: string;

  constructor(private fb: FormBuilder, private accountService: AccountService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.startCountdown();

  }

  confirmEmail() {
    if (this.confirmCodeForm.invalid) return;

    const values = { email: this.email };
    this.accountService.confirmLogin(values).subscribe({
      next: () => {
        this.confirmationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  initializeForm() {
    this.email = this.route.snapshot.queryParams['email'];
    this.confirmCodeForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

  resendCode() {
    const values = { ...this.confirmCodeForm.value, email: this.email };

    this.accountService.resendVerificationCode(values).subscribe({
      next: () => {
        console.log('Verification code resent');
        this.codeSent = true;
        this.startCountdown();
        setTimeout(() => this.codeSent = false, 5000);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  startCountdown() {
    this.countdown = 120;
    this.clearCountdown();
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      this.cdr.detectChanges();
      if (this.countdown === 0) {
        this.clearCountdown();
      }
    }, 1000);
  }

  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
