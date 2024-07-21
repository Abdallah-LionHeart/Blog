import { Component, OnInit } from '@angular/core';
import { BackgroundImage } from 'src/app/appModels/BackgroundImage';
import { AdminService } from 'src/app/appService/admin.service';
import { ConfirmService } from 'src/app/appService/confirm.service';

@Component({
  selector: 'app-background-images',
  templateUrl: './background-images.component.html',
  styleUrls: ['./background-images.component.scss']
})
export class BackgroundImagesComponent implements OnInit {
  backgroundImages: BackgroundImage[] = [];
  files: File[] = [];
  uploadProgress: number = 0;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private adminService: AdminService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.loadAllBackgroundImages();
  }

  loadAllBackgroundImages() {
    this.adminService.getAllBackgroundImages().subscribe({
      next: (images: BackgroundImage[]) => {
        this.backgroundImages = images || [];
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
        // const backgroundImage: BackgroundImage = { id: 0, url: '', publicId: '' };
        this.adminService.addBackgroundImage(1, file).subscribe({
          next: (image) => {
            this.backgroundImages.push(image);
            uploadCount--;
            this.uploadProgress = ((this.files.length - uploadCount) / this.files.length) * 100;
            if (uploadCount === 0) {
              this.loadAllBackgroundImages();
              this.uploadProgress = 0;
              this.confirmService.showAlert('Background Picture Uploaded Successfully!', 'success');
            }
          },
          error: (err) => {
            console.error('Failed to upload background image', err);
            this.confirmService.showAlert('Failed to upload background images.', 'danger');
          }
        });
      });
      this.files = [];
    }
  }



  deleteBackgroundImage(id: number) {
    this.adminService.deleteBackgroundImage(id).subscribe({
      next: () => {
        this.backgroundImages = this.backgroundImages.filter(image => image.id !== id)
        this.confirmService.showAlert('Background Picture Deleted Successfully.', 'success');
      },
      error: (err) => {
        console.error('Failed to delete background image', err);
        this.confirmService.showAlert('Failed to delete background image.', 'danger');
      }
    });
  }
}
