import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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
  slidesStore: Array<{ id: number, src: string, alt: string, title: string }> = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // dots: true,
    navSpeed: 700,
    // autoplay: true,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    // nav: true
  }

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const userId = 1; // Adjust this as needed
    this.loadUser(userId);
    this.loadBackgroundImages(userId);
    this.loadAllBackgroundImages();
    this.loadProfileImages();
  }

  loadAllBackgroundImages() {
    this.adminService.getAllBackgroundImages().subscribe({
      next: (images: BackgroundImage[]) => {
        this.backgroundImages = images || [];
      }
    })
  }

  loadUser(userId: number) {
    this.adminService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }
  loadBackgroundImages(userId: number) {
    this.adminService.getBackgroundImages(userId).subscribe({
      next: (images: any) => {
        this.backgroundImages = images || [];
      }
    });
  }

  loadBackgroundImagess() {
    this.adminService.getAllBackgroundImages().subscribe({
      next: (images: BackgroundImage[]) => {
        this.backgroundImages = images;
      },
      error: (err: any) => {
        console.error('Error loading background images:', err);
      },
      complete: () => {
        console.log('Background images loading completed');
      }
    });
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
