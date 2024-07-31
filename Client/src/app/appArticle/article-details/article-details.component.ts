import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/appModels/article';
import { ArticleService } from 'src/app/appService/article.service';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article!: Article;
  media: any[] = [];
  currentSlide: number = 0;
  faArrowRightLong = faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;
  // faFacebook = faFacebook;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.initializeMedia();
    this.loadArticle();
  }

  loadArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(+id).subscribe({
        next: data => {
          this.article = data;
          this.initializeMedia();
        },
        error: err => {
          console.error('Error fetching article', err);
        }
      });
    }
  }

  initializeMedia(): void {
    if (this.article) {
      this.media = [
        ...this.article.images.map(image => image.url),
        ...this.article.videos.map(video => video.url),
        ...(this.article.youTubeLink ? [this.article.youTubeLink] : [])
      ];
    }
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



  // loadArticle() {
  //   this.articleId = +this.route.snapshot.paramMap.get('id')!;
  //   this.articleService.getArticleById(this.articleId).subscribe({
  //     next: article => {
  //       this.article = article,
  //         this.bcService.set('@articleDetails', article.headline)
  //     }
  //   })
  // }
}
