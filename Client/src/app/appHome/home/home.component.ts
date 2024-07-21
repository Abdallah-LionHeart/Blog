import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BackgroundImage } from 'src/app/appModels/BackgroundImage';
import { ProfileImage } from 'src/app/appModels/ProfileImage';
import { User } from 'src/app/appModels/user';
import { AdminService } from 'src/app/appService/admin.service';
import { Article } from '../../appModels/article';
import { ArticleService } from '../../appService/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articles!: Article[];
  user!: User;
  backgroundImages: BackgroundImage[] = [];
  backgroundImage!: BackgroundImage;
  profileImage: ProfileImage | undefined;
  slidesStore: Array<{ id: number, src: string, alt: string, title: string }> = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
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
        items: 1
      }
    },
    nav: true
  }

  constructor(private articleService: ArticleService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadArticles();
    const userId = this.user.id; // Adjust this as needed
    this.loadUser(userId);
    this.loadBackgroundImages(userId);
    this.loadAllBackgroundImages();
    this.loadProfileImages();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((data: Article[]) => {
      this.articles = data;
    });
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
