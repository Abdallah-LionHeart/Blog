import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {
  // this.token = this.route.snapshot.queryParamMap.get('token');
  // if (this.token) {
  //   this.accountService.confirmEmail(this.token).subscribe(success => {
  //     this.success = success;
  //     if (success) {
  //       this.router.navigate(['/admin-login']);
  //     }
  //   });
  // }
}
