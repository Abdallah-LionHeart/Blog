import { Component, OnInit } from '@angular/core';
import { BackgroundImage } from 'src/app/appModels/BackgroundImage';
import { AdminService } from 'src/app/appService/admin.service';
import { ArticleService } from 'src/app/appService/article.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  backgroundImages!: BackgroundImage[];
  backgroundImage!: BackgroundImage;

  constructor(private adminService: AdminService, private articleService: ArticleService) { }

  ngOnInit() {
    this.loadBackgroundImages();
  }

  loadBackgroundImages() {
    this.adminService.getAllBackgroundImages().subscribe({
      next: response => {
        this.backgroundImages = response;
      }
    })
  }
}
