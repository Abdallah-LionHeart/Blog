import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Article } from 'src/app/appModels/article';
import { TagDto } from 'src/app/appModels/tagDto';
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
  tags!: TagDto[];
  selectedTags: TagDto[] = [];
  userDefinedTags: string[] = [];
  formProgress: number = 0;
  overallProgress: number = 0;
  publishingProgress: number = 0;
  isPublishing: boolean = false;
  private publishingSubscription?: Subscription;


  constructor(private fb: FormBuilder, private articleService: ArticleService, private confirmService: ConfirmService, private router: Router, private cacheService: CacheService) {
    this.articleForm = this.fb.group({
      title: [''],
      content: [''],
      headline: [''],
      isEvent: ['no'],
      youTubeLink: [''],
      facebookLink: [''],
      tags: [[], []]
    });
    this.articleForm.valueChanges.subscribe(() => this.updateFormProgress());
  }

  ngOnInit(): void {
    this.articleService.getAllTags().subscribe(tags => {
      this.tags = tags.slice(0, 10); // Fetch and display the last 10 tags
    });
    const savedForm = this.cacheService.getData(this.storageKey);
    if (savedForm) {
      this.articleForm.patchValue(savedForm);
      this.selectedTags = savedForm.tags?.selectedTags || [];
      this.userDefinedTags = savedForm.tags?.userDefinedTags || [];
      this.articleForm.get('tags')?.setValue([this.selectedTags, this.userDefinedTags]);
    }
    this.updateFormProgress()
  }

  ngOnDestroy(): void {
    if (this.articleForm.dirty || this.articleForm.touched) {
      this.cacheService.saveData(this.storageKey, {
        ...this.articleForm.value,
        tags: {
          selectedTags: this.selectedTags,
          userDefinedTags: this.userDefinedTags
        }
      });
    } else {
      this.cacheService.removeData(this.storageKey);
    }
    if (this.publishingSubscription) {
      this.publishingSubscription.unsubscribe();
    }
  }

  updateFormProgress() {
    const totalFields = Object.keys(this.articleForm.controls).length;
    const filledFields = Object.values(this.articleForm.controls).filter(control => control.value !== null && control.value !== '').length;
    this.formProgress = Math.round((filledFields / totalFields) * 100);
    if (this.isPublishing) {
      this.overallProgress = this.formProgress;
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
          this.updateFormProgress();
        };
        reader.readAsDataURL(file);
      });
    } else if (field === 'videos') {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoPreviews.push({ name: file.name, url: e.target.result });
          this.videos.push(file);
          this.updateFormProgress();
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
    this.updateFormProgress();
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
    this.updateFormProgress();
  }

  removeFile(index: number, field: string) {
    if (field === 'images') {
      this.images.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    } else if (field === 'videos') {
      this.videos.splice(index, 1);
      this.videoPreviews.splice(index, 1);
    }
    this.updateFormProgress();
  }

  onTagsInput(event: any) {
    const inputValue: string = event.target.value;
    const tagsArray: string[] = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag);
    this.userDefinedTags = [...new Set(tagsArray)]; // Avoid duplicates
    this.updateDisplayedTags();
    this.updateTagsFormControl();
    this.updateFormProgress();
  }

  updateDisplayedTags() {
    const allTags = [...this.selectedTags.map(tag => tag.name), ...this.userDefinedTags];
    this.articleForm.patchValue({ tags: allTags.join(', ') });
    this.updateFormProgress();
  }

  removeTag(tag: string | TagDto, isUserDefined: boolean) {
    if (isUserDefined) {
      this.userDefinedTags = this.userDefinedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t.name !== (tag as TagDto).name);
    }
    this.updateDisplayedTags();
  }
  updateTagsFormControl() {
    this.articleForm.get('tags')?.setValue([this.selectedTags, this.userDefinedTags]);
  }

  onTagSelect(tag: TagDto, event: any) {
    if (event.target.checked) {
      if (!this.selectedTags.some(t => t.id === tag.id)) {
        this.selectedTags.push(tag);
      }
    } else {
      this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    }
    this.updateTagsFormControl();
    this.updateDisplayedTags();
  }



  onSubmit() {
    if (this.isPublishing) return; // Prevent multiple submissions
    this.isPublishing = true;
    this.publishingProgress = 0;
    this.overallProgress = this.formProgress;
    this.publishingSubscription = interval(500).subscribe(() => {
      if (this.publishingProgress < 100) {
        this.publishingProgress += 20; // Simulate progress increment
        this.overallProgress = Math.max(this.formProgress, this.publishingProgress);
      }
    });
    const formValue = this.articleForm.value;
    const article: Article = {
      ...formValue,
      isEvent: formValue.isEvent === 'yes',
      tags: [
        ...this.selectedTags.map(tag => tag.name),
        ...this.userDefinedTags
      ]
      // tags: [
      //   ...this.selectedTags,
      //   ...this.userDefinedTags.map(name => ({ name }))
      // ].filter((tag, index, self) => self.findIndex(t => t.name === tag.name) === index) // Remove duplicates
    };
    this.articleService.addArticle(article, this.images, this.videos).subscribe({
      next: () => {
        this.publishingSubscription?.unsubscribe();
        this.publishingProgress = 100;
        this.overallProgress = 100;
        this.confirmService.showAlert('Article Created Successfully.', 'success');
        this.router.navigateByUrl('/articles');
      },
      error: error => {
        this.publishingSubscription?.unsubscribe();
        this.isPublishing = false;
        console.log(error);
        this.confirmService.showAlert('Failed to Create Article.', 'danger');
      }
    })
  }

  preventSubmitOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}

