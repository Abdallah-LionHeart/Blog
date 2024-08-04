import { Component, computed, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  collapsed = signal(false);

  // sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  // Determine if the screen size is less than 413px
  isScreenSmall(): boolean {
    return window.innerWidth < 413;
  }

  // Compute the sidenav width based on screen size and toggle state
  sidenavWidth = computed(() => {
    if (this.isScreenSmall()) {
      return this.collapsed() ? '0px' : '200px';
    } else {
      return this.collapsed() ? '65px' : '250px';
    }
  });

  // Listen for window resize events to update the component state
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.sidenavWidth = computed(() => {
      if (this.isScreenSmall()) {
        return this.collapsed() ? '0px' : '200px';
      } else {
        return this.collapsed() ? '65px' : '250px';
      }
    });
  }

  // Toggle the sidenav collapse state
  toggleSidenav() {
    this.collapsed.update(c => !c);
  }
}
