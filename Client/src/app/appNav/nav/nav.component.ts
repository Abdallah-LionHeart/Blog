import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/appModels/admin';
import { AccountService } from 'src/app/appService/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  logout() {
    this.accountService.logout();
  }

  setCurrentUser() {
    const adminString = localStorage.getItem('admin')
    if (!adminString) return;
    const admin: Admin = JSON.parse(adminString);
    this.accountService.setCurrentAdmin(admin);
  }
}
