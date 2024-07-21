import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/appModels/article';
import { ArticleService } from 'src/app/appService/article.service';
import { CacheService } from 'src/app/appService/cache.service';
import { ConfirmService } from 'src/app/appService/confirm.service';


@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit, OnDestroy {
  articleForm: FormGroup;
  imagePreviews: { name: string, url: string }[] = [];
  videoPreviews: { name: string, url: string }[] = [];
  images: File[] = [];
  videos: File[] = [];
  youTubeThumbnail: string = '';
  alertMessage: string = '';
  alertType: string = '';
  private storageKey = 'articleForm';


  constructor(private fb: FormBuilder, private articleService: ArticleService, private confirmService: ConfirmService, private router: Router, private cacheService: CacheService) {
    this.articleForm = this.fb.group({
      title: [''],
      content: [''],
      headline: [''],
      isEvent: ['no'],
      youTubeLink: [''],
      facebookLink: [''],
      // images: [null],
      // videos: [null]
    });
  }

  ngOnInit(): void {
    const savedForm = this.cacheService.getData(this.storageKey);
    if (savedForm) {
      this.articleForm.patchValue(savedForm);
    }
  }

  ngOnDestroy(): void {
    if (this.articleForm.dirty || this.articleForm.touched) {
      this.cacheService.saveData(this.storageKey, this.articleForm.value);
    } else {
      this.cacheService.removeData(this.storageKey);
    }
  }

  onFileChange(event: any, field: any) {
    const files = Array.from(event.target.files) as File[];
    if (field === 'images') {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push({ name: file.name, url: e.target.result });
          this.images.push(file);
        };
        reader.readAsDataURL(file);
      });
    } else if (field === 'videos') {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoPreviews.push({ name: file.name, url: e.target.result });
          this.videos.push(file);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onYouTubeLinkChange() {
    const link = this.articleForm.controls['youTubeLink'].value;
    const videoId = this.extractYouTubeVideoId(link);
    if (videoId) {
      this.youTubeThumbnail = this.generateYouTubeThumbnailUrl(videoId);
    } else {
      this.youTubeThumbnail = '';
    }
  }

  generateYouTubeThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  extractYouTubeVideoId(url: string) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }



  clearFiles(field: any) {
    if (field === 'images') {
      this.images = [];
      this.imagePreviews = [];
    } else if (field === 'videos') {
      this.videos = [];
      this.videoPreviews = [];
    }
  }

  removeFile(index: number, field: string) {
    if (field === 'images') {
      this.images.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    } else if (field === 'videos') {
      this.videos.splice(index, 1);
      this.videoPreviews.splice(index, 1);
    }
  }

  onSubmit() {
    const formValue = this.articleForm.value;
    const article: Article = {
      ...formValue,
      isEvent: formValue.isEvent === 'yes'
    };
    this.articleService.addArticle(article, this.images, this.videos).subscribe({
      next: () => {
        this.confirmService.showAlert('Article Created Successfully.', 'success')
        setTimeout(() => {
          this.router.navigate(['/articles']);
        }, 3000);
      },
      error: error => {
        console.log(error);
        this.confirmService.showAlert('Failed to Create Article.', 'danger');
      }
    })
  }
}

