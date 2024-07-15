import { Component } from '@angular/core';
import { User } from '../../appModels/user';
import { AccountService } from '../../appService/account.service';
import { AdminService } from '../../appService/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user!: User;

  constructor(private accountService: AccountService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    // Replace 'admin-id' with the actual admin user id
    this.adminService.getUserById('admin-id').subscribe((data: User) => {
      this.user = data;
    });
  }

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminService.addProfileImage(this.user.id, file).subscribe(() => {
        this.loadUser();
      });
    }
  }

  onBackgroundImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminService.addBackgroundImage(this.user.id, file).subscribe(() => {
        this.loadUser();
      });
    }
  }

  setMainProfileImage(imageId: number) {
    this.adminService.setMainProfileImage(imageId).subscribe(() => {
      this.loadUser();
    });
  }
  updateUser() {
    this.adminService.updateUser(this.user.id, this.user).subscribe();
  }
}
