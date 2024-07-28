import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faArrowLeftLong, faArrowRightLong, faCircleInfo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/appModels/article';

@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.scss']
})
export class ArticleCardsComponent {
  // @Input() article!: Article;
  // currentSlide: number = 0;
  // faCircleInfo = faCircleInfo;
  // faEdit = faEdit;
  // media: any[] = [];
  // faArrowRightLong = faArrowRightLong;
  // faArrowLeftLong = faArrowLeftLong;

  // constructor() { }


  // ngOnInit(): void {
  //   this.initializeMedia();
  // }

  // initializeMedia(): void {
  //   // Assuming `article.images` and `article.videos` are arrays of image URLs and video URLs respectively.
  //   this.media = [
  //     ...this.article.images.map(image => image.url), // For images
  //     ...this.article.videos.map(video => video.url), // For videos
  //     ...(this.article.youTubeLink ? [this.article.youTubeLink] : []) // For YouTube links
  //   ];

  //   // If YouTube link is present, add it to the media array.
  //   if (this.article.youTubeLink) {
  //     this.media.push(this.article.youTubeLink);
  //   }
  // }

  // nextSlide(): void {
  //   this.currentSlide = (this.currentSlide + 1) % this.media.length;
  // }

  // prevSlide(): void {
  //   this.currentSlide = (this.currentSlide - 1 + this.media.length) % this.media.length;
  // }
  @Input() article!: Article;
  currentSlide: number = 0;
  faCircleInfo = faCircleInfo;
  faEdit = faEdit;
  media: any[] = [];
  faArrowRightLong = faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;
  truncatedHeadline: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initializeMedia();
    this.truncateHeadline();
  }

  initializeMedia(): void {
    this.media = [
      ...this.article.images.map(image => image.url),
      ...this.article.videos.map(video => video.url),
      ...(this.article.youTubeLink ? [this.article.youTubeLink] : [])
    ];
  }

  truncateHeadline(): void {
    this.truncatedHeadline = this.article.headline.length > 30 ? 
      `${this.article.headline.substring(0, 30)}...` : 
      this.article.headline;
  }

  isImage(mediaItem: string): boolean {
    return mediaItem.endsWith('.jpg') || mediaItem.endsWith('.jpeg') || mediaItem.endsWith('.png') || mediaItem.endsWith('.gif');
  }

  isVideo(mediaItem: string): boolean {
    return mediaItem.endsWith('.mp4') || mediaItem.endsWith('.webm') || mediaItem.endsWith('.ogg');
  }

  isYouTube(mediaItem: string): boolean {
    return mediaItem.includes('youtube.com') || mediaItem.includes('youtu.be');
  }

  getYouTubeEmbedUrl(mediaItem: string): SafeResourceUrl {
    const videoId = this.extractYouTubeVideoId(mediaItem);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractYouTubeVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.media.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.media.length) % this.media.length;
  }
}
