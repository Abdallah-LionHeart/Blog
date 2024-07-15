import { Component, Input } from '@angular/core';
import { AppUserImage } from 'src/app/appModels/app-user-image';

import { AdminService } from 'src/app/appService/admin.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {
  @Input() userId!: string;
  @Input() profileImages!: AppUserImage[];
  @Input() backgroundImages!: AppUserImage[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { }

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminService.addProfileImage(this.userId, file).subscribe({
        next: image => {
          this.profileImages.push(image);

        }
      })
    }
  }


  onBackgroundImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.adminService.addBackgroundImage(this.userId, file).subscribe(image => {
        this.backgroundImages.push(image);
      });
    }
  }

  setMainProfileImage(imageId: number) {
    this.adminService.setMainProfileImage(imageId).subscribe(() => {
      this.profileImages.forEach(image => {
        if (image.id === imageId) {
          image.isMain = true;
        } else {
          image.isMain = false;
        }
      });
    });
  }

  setMainBackgroundImage(imageId: number) {
    this.adminService.setMainBackgroundImage(imageId).subscribe(() => {
      this.backgroundImages.forEach(image => {
        if (image.id === imageId) {
          image.isMain = true;
        } else {
          image.isMain = false;
        }
      });
    });
  }

  deleteProfileImage(imageId: number) {
    this.adminService.deleteProfileImage(imageId).subscribe(() => {
      this.profileImages = this.profileImages.filter(image => image.id !== imageId);
    });
  }

  deleteBackgroundImage(imageId: number) {
    this.adminService.deleteBackgroundImage(imageId).subscribe(() => {
      this.backgroundImages = this.backgroundImages.filter(image => image.id !== imageId);
    });
  }
}
