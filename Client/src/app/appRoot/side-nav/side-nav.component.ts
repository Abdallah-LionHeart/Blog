import { Component, computed, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'src/app/appModels/menuItem';
import { UserDto } from 'src/app/appModels/userDto';
import { AccountService } from 'src/app/appService/account.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  user!: UserDto;
  private unsubscribe$ = new Subject<void>();
  sidenavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');
  constructor(public accountService: AccountService, private router: Router) {

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

  handleItemClick(item: MenuItem) {
    if (item.route === 'logout') {
      this.logout();
    }
  }



  menuItems = signal<MenuItem[]>([
    {
      icon: 'account_box',
      label: 'Profile',
      route: 'profile',
    },
    {
      icon: 'space_dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'add',
      label: 'Add Article',
      route: 'create',
    },
    {
      icon: 'calendar_view_day',
      label: 'Articles',
      route: 'articles',
    },
    {
      icon: 'event',
      label: 'Events',
      route: 'article-event',
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'settings',
    },
    {
      icon: 'quiz',
      label: 'Help',
      route: 'help',
    },
    {
      icon: 'logout',
      label: 'Logout',
      route: 'logout',
    },
  ])


  // bottomMenuItems = signal<MenuItem[]>([
  //   {
  //     icon: 'settings',
  //     label: 'Settings',
  //     route: 'settings',
  //   },
  //   {
  //     icon: 'help',
  //     label: 'Help',
  //     route: 'help',
  //   },
  //   {
  //     icon: 'logout',
  //     label: 'Logout',
  //     route: 'logout',
  //   },
  // ]);
}

