import { Component, Input } from '@angular/core';
import { faArrowLeftLong, faArrowRightLong, faCircleInfo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/appModels/article';

@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.scss']
})
export class ArticleCardsComponent {
  @Input() article!: Article;
  currentSlide: number = 0;
  faCircleInfo = faCircleInfo;
  faEdit = faEdit;
  media: any[] = [];
  faArrowRightLong = faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;

  constructor() { }


  ngOnInit(): void {
    this.initializeMedia();
  }

  initializeMedia(): void {
    // Assuming `article.images` and `article.videos` are arrays of image URLs and video URLs respectively.
    this.media = [
      ...this.article.images.map(image => image.url), // For images
      ...this.article.videos.map(video => video.url), // For videos
      ...(this.article.youTubeLink ? [this.article.youTubeLink] : []) // For YouTube links
    ];

    // If YouTube link is present, add it to the media array.
    if (this.article.youTubeLink) {
      this.media.push(this.article.youTubeLink);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.media.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.media.length) % this.media.length;
  }

}
