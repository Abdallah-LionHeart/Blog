// src/app/admin/profile-images/profile-images.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileImage } from 'src/app/appModels/ProfileImage';
import { User } from 'src/app/appModels/user';
import { AdminService } from 'src/app/appService/admin.service';
import { ConfirmService } from 'src/app/appService/confirm.service';


@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.scss']
})

export class ProfileImagesComponent implements OnInit {
  @Output() profileImagesUpdated = new EventEmitter<void>();
  profileImages: ProfileImage[] = [];
  files: File[] = [];
  user!: User;
  uploadProgress: number = 0;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private adminService: AdminService, public confirmService: ConfirmService) { }

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
        // const profileImage: ProfileImage = { id: 0, url: '', isMain: false, publicId: '' };
        this.adminService.addProfileImage(1, file).subscribe({
          next: (newImage: ProfileImage) => {
            this.profileImages.push(newImage);
            uploadCount--;
            this.uploadProgress = ((this.files.length - uploadCount) / this.files.length) * 100;
            if (uploadCount === 0) {
              this.loadAllProfileImages();
              this.uploadProgress = 0;
              this.confirmService.showAlert('Image uploaded successfully!', 'success');
            }
          },
          error: (err) => {
            console.error('Failed to upload profile image', err)
            this.confirmService.showAlert('Failed to upload images.', 'danger')
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
        this.confirmService.showAlert('Image deleted successfully.', 'success');
      },
      error: (err) => {
        console.error('Failed to delete profile image', err)
        this.confirmService.showAlert('Failed to delete image.', 'danger');
      }
    });
  }

  setMainProfileImage(id: number) {
    this.adminService.setMainProfileImage(id).subscribe({
      next: () => {
        this.profileImages.forEach(image => image.isMain = image.id === id);
        this.profileImagesUpdated.emit();
        this.confirmService.showAlert('Profile Picture Updated.', 'success');
      },
      error: (err) => {
        console.error('failed to set profile image', err);
        this.confirmService.showAlert('Failed to Updated.', 'danger');
      }
    });
  }
}
