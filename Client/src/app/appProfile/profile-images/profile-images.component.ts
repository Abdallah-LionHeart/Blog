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
  files: File[] = [];
  uploadProgress: number = 0;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAllProfileImages();
  }

  loadAllProfileImages() {
    this.adminService.getAllProfileImages().subscribe({
      next: (images: any) => {
        this.profileImages = images || [];
      }
    })
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.files.push(file);
    }
  }


  uploadFiles() {
    if (this.files.length > 0) {
      let uploadCount = this.files.length;
      this.files.forEach(file => {
        const profileImage: ProfileImage = { id: 0, url: '', isMain: false, publicId: '' };
        this.adminService.addProfileImage(1, profileImage, file).subscribe({
          next: (image) => {
            this.profileImages.push(image);
            uploadCount--;
            this.uploadProgress = ((this.files.length - uploadCount) / this.files.length) * 100;
            if (uploadCount === 0) {
              this.loadAllProfileImages();
              this.uploadProgress = 0;
              this.showAlert('Image uploaded successfully!', 'success');
            }
          },
          error: (err) => {
            console.error('Failed to upload profile image', err)
            this.showAlert('Failed to upload images.', 'danger')
          }
        });
      });
      this.files = [];
    }
  }



  deleteProfileImage(id: number) {
    this.adminService.deleteProfileImage(id).subscribe({
      next: () => {
        this.profileImages = this.profileImages.filter(image => image.id !== id);
        this.showAlert('Image deleted successfully.', 'success');
      },
      error: (err) => {
        console.error('Failed to delete profile image', err)
        this.showAlert('Failed to delete image.', 'danger');
      }
    });
  }

  setMainProfileImage(id: number) {
    this.adminService.setMainProfileImage(id).subscribe({
      next: () => {
        this.profileImages.forEach(image => {
          image.isMain = image.id === id;
        });
        this.showAlert('Profile Picture Updated.', 'success');
      },
      error: (err) => {
        console.error('failed to set profile image', err);
        this.showAlert('Failed to Updated.', 'danger');
      }
    });
  }

  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}
