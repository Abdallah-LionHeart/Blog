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
    this.adminService.getUser(1).subscribe({
      next: user => {
        this.user = user;
        this.loadProfileImage();
      }, error: error => {
        console.error('Error loading user', error);
      }
    })
  }


  loadProfileImage() {
    if (this.user && this.user.profileImages && this.user.profileImages.length > 0) {
      this.profileImageUrl = this.user.profileImages.find(img => img.isMain)?.url || this.user.profileImages[0].url;
    }
  }

  onProfileImagesUpdated() {
    this.loadUser();
  }


  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminService.addProfileImage(this.user.id, file).subscribe({
        next: (newImage: ProfileImage) => {
          this.user.profileImages.push(newImage);
          this.loadProfileImage();
        }, error: error => {
          console.error('Error adding profile image', error)
        }
      });
    }
  }

  onSetMainProfileImage(id: number) {
    this.adminService.setMainProfileImage(id).subscribe({
      next: () => {
        this.user.profileImages.forEach(img => img.isMain = img.id === id);
        this.loadProfileImage();
      }, error: error => {
        console.error('Error setting main profile image', error)
      }
    })
  }
}
