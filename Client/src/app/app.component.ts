import { Component, computed, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserDto } from './appModels/userDto';
import { AccountService } from './appService/account.service';
import { AdminService } from './appService/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild('sidenav') sidenav!: MatSidenav;
  isNavBarVisiable = false;
  user!: UserDto;
  private unsubscribe$ = new Subject<void>();

  constructor(public accountService: AccountService, private router: Router, private adminService: AdminService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
    this.accountService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) this.user = user;
      });
  }



  setCurrentUser() {
    const userString = localStorage.getItem('user')
    if (!userString) return;
    const user: UserDto = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  logout() {
    this.accountService.logout();
    // this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }


}
