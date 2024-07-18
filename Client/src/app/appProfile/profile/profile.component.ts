import { Component } from '@angular/core';
import { ProfileImage } from 'src/app/appModels/ProfileImage';
import { User } from 'src/app/appModels/user';
import { AdminService } from 'src/app/appService/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // profileImageUrl: string = 'https://via.placeholder.com/150'; 
  profileImageUrl!: string; // Default image
  user!: User;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.adminService.getUser(1).subscribe(user => {
      this.user = user;
      this.loadProfileImage();
    }, error => {
    });
  }

  loadProfileImage() {
    if (this.user && this.user.profileImages && this.user.profileImages.length > 0) {
      this.profileImageUrl = this.user.profileImages.find(img => img.isMain)?.url || this.user.profileImages[0].url;
    }
  }

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const profileImage: ProfileImage = { id: 0, url: '', isMain: false, publicId: '' };
      this.adminService.addProfileImage(this.user.id, profileImage, file).subscribe(() => {
        this.loadUser();
      });
    }
  }
}
