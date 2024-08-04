import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/appModels/userDto';


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
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: UserDto = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
