import { Component } from '@angular/core';
import { BackgroundImage } from 'src/app/appModels/BackgroundImage';
import { AdminService } from 'src/app/appService/admin.service';

@Component({
  selector: 'app-background-images',
  templateUrl: './background-images.component.html',
  styleUrls: ['./background-images.component.scss']
})
export class BackgroundImagesComponent {
  backgroundImages: BackgroundImage[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadBackgroundImages();
  }

  loadBackgroundImages() {
    this.adminService.getBackgroundImages(1).subscribe({
      next: (images: any) => {
        this.backgroundImages = images;
      }
    })
  }

  onBackgroundImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const backgroundImage: BackgroundImage = { id: 0, url: '', publicId: '' };
      this.adminService.addBackgroundImage(1, backgroundImage, file).subscribe({
        next: () => {
          this.loadBackgroundImages();
        }
      })
    }
  }

  deleteBackgroundImage(id: number) {
    this.adminService.deleteBackgroundImage(id).subscribe({
      next: () => {
        this.loadBackgroundImages();
      }
    })
  }

  // setMainBackgroundImage(id: number) {
  //   this.adminService.setMainBackgroundImage(id).subscribe(() => {
  //     this.toastr.success('Main background image set successfully');
  //     this.loadBackgroundImages();
  //   }, error => {
  //     this.toastr.error('Failed to set main background image');
  //   });
  // }

}
