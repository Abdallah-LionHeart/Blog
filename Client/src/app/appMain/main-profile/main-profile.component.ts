import { Component, OnInit } from '@angular/core';
import { BackgroundImage } from 'src/app/appModels/BackgroundImage';
import { ProfileImage } from 'src/app/appModels/ProfileImage';
import { User } from 'src/app/appModels/user';
import { AdminService } from 'src/app/appService/admin.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {
  user!: User;
  backgroundImages: BackgroundImage[] = [];
  profileImage: ProfileImage | undefined;
  profileImageUrl!: string;
  slidesStore: Array<{ id: number, src: string, alt: string, title: string }> = [];



  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const userId = 1; // Adjust this as needed
    this.loadUser(userId);
    this.loadProfileImages();
  }


  loadUser(userId: number) {
    this.adminService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  loadProfileImage() {
    if (this.user && this.user.profileImages && this.user.profileImages.length > 0) {
      this.profileImageUrl = this.user.profileImages.find(img => img.isMain)?.url || this.user.profileImages[0].url;
    }
  }

  loadProfileImages() {
    this.adminService.getAllProfileImages().subscribe({
      next: (images: ProfileImage[]) => {
        this.profileImage = images.find((image: ProfileImage) => image.isMain);
      },
      error: (err: any) => {
        console.error('Error loading profile images:', err);
      },
      complete: () => {
        console.log('Profile images loading completed');
      }
    });
  }
}
