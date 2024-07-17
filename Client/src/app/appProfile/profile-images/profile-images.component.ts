// src/app/admin/profile-images/profile-images.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfileImage } from 'src/app/appModels/ProfileImage';
import { AdminService } from 'src/app/appService/admin.service';


@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.scss']
})

export class ProfileImagesComponent implements OnInit {
  profileImages: ProfileImage[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadProfileImages();
  }

  loadProfileImages() {
    this.adminService.getProfileImages(1).subscribe({
      next: (images: any) => {
        this.profileImages = images;
      }
    })
  }

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const profileImage: ProfileImage = { id: 0, url: '', isMain: false, publicId: '' };
      this.adminService.addProfileImage(1, profileImage, file).subscribe(() => {
        this.loadProfileImages();
      }, error => {
      });
    }
  }

  deleteProfileImage(id: number) {
    this.adminService.deleteProfileImage(id).subscribe({
      next: () =>
        this.loadProfileImages()
    })


  }

  setMainProfileImage(id: number) {
    this.adminService.setMainProfileImage(id).subscribe({
      next: () =>
        this.loadProfileImages()
    })
  }
}
