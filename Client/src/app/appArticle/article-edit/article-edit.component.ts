import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/appModels/article';
import { ImageDto } from 'src/app/appModels/imageDto';
import { TagDto } from 'src/app/appModels/tagDto';
import { VideoDto } from 'src/app/appModels/videoDto';
import { ArticleService } from 'src/app/appService/article.service';
import { ConfirmService } from 'src/app/appService/confirm.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  articleForm!: FormGroup;
  imagePreviews: { name: string, url: string }[] = [];
  videoPreviews: { name: string, url: string }[] = [];
  images: File[] = [];
  videos: File[] = [];
  youTubeThumbnail: string = '';
  articleId!: number;
  alertMessage: string = '';
  alertType: string = '';
  predefinedTags: string[] = []; // For predefined tags (optional)
  selectedTags: TagDto[] = []; // For selected predefined tags
  userDefinedTags: string[] = [];


  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.articleForm?.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService
  ) {

  }

  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadArticle();
    this.initializeForm();
  }

  initializeForm() {
    this.articleForm = this.fb.group({
      title: [''],
      content: [''],
      headline: [''],
      isEvent: ['no'],
      youTubeLink: [''],
      facebookLink: [''],
      tags: ['']
    });
  }


  loadArticle(): void {
    this.articleService.getArticleById(this.articleId).subscribe(article => {
      this.articleForm.patchValue(article);
      this.imagePreviews = this.transformImageDtos(article.images || []);
      this.videoPreviews = this.transformVideoDtos(article.videos || []);
      this.selectedTags = article.tags || []; // Load existing tags
      this.userDefinedTags = []; // Initialize or load user-defined tags if needed
      // this.updateTagInput();
      // tags: this.formatTagsForInput(article.tags || [])

      this.articleForm.patchValue({
        tags: this.selectedTags.map(tag => tag.name).join(', ')
      });
      // this.youTubeThumbnail = this.extractYouTubeVideoId(article.youTubeLink)
      // ? this.generateYouTubeThumbnailUrl(this.extractYouTubeVideoId(article.youTubeLink)!)
      // : '';
    });
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(this.articleId).subscribe({
      next: () => {
        this.articleId === id;
      }
    })
  }

  updateTagInput() {
    // Combine selectedTags and userDefinedTags into a single string for input field
    const allTags = [...this.selectedTags, ...this.userDefinedTags];
    this.articleForm.controls['tags'].setValue(allTags.join(', '));
  }
  formatTagsForInput(tags: TagDto[]): string {
    // Convert tags array to a comma-separated string
    return tags.map(tag => tag.name).join(', ');
  }

  // onTagsInput(event: any) {
  //   const inputValue = event.target.value;
  //   const tagsArray = inputValue.split(',').map((tag: any) => tag.trim()).filter((tag: any) => tag);
  //   this.userDefinedTags = [...new Set([...this.userDefinedTags, ...tagsArray])]; // Avoid duplicates
  // }

  onTagsInputt(event: any) {
    const inputValue: string = event.target.value;
    const tagsArray: string[] = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag);
    this.userDefinedTags = [...new Set(tagsArray)]; // Avoid duplicates
    // event.target.value = ''; // Clear the input field after processing
    this.updateDisplayedTags();
  }

  onTagsInput(event: any) {
    const inputValue: string = event.target.value;
    const tagsArray: string[] = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag);

    // Combine selectedTags and userDefinedTags for comparison
    const existingTags = new Set(this.selectedTags.map(tag => tag.name));
    const allTags = new Set([...existingTags, ...tagsArray]);

    // Update userDefinedTags without including existing tags
    this.userDefinedTags = tagsArray.filter(tag => !existingTags.has(tag));
  }


  updateDisplayedTags() {
    const allTags = [...this.selectedTags.map(tag => tag.name), ...this.userDefinedTags];
    this.articleForm.patchValue({ tags: allTags.join(', ') });
  }

  removeTag(tag: string | TagDto, isUserDefined: boolean) {
    if (isUserDefined) {
      this.userDefinedTags = this.userDefinedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t.name !== (tag as TagDto).name);
    }
    this.updateDisplayedTags();
  }

  transformImageDtos(images: ImageDto[]): { name: string; url: string }[] {
    return images.map(image => ({
      name: image.url.split('/').pop() || 'Unknown', // Assuming `url` includes the file name
      url: image.url
    }));
  }

  transformVideoDtos(videos: VideoDto[]): { name: string; url: string }[] {
    return videos.map(video => ({
      name: video.url.split('/').pop() || 'Unknown', // Assuming `url` includes the file name
      url: video.url
    }));
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
      isEvent: formValue.isEvent === 'yes',
      id: this.articleId, // Include the article ID for updating
      tags: [
        ...this.selectedTags,
        ...this.userDefinedTags.map(name => ({ name }))
      ].filter((tag, index, self) => self.findIndex(t => t.name === tag.name) === index) // Remove duplicates
    };
    this.articleService.updateArticle(article.id, article, this.images, this.videos).subscribe({
      next: () => {
        this.articleForm.reset(this.articleId)
        this.confirmService.showAlert('Article Updated Successfully.', 'success')
        setTimeout(() => {
          this.router.navigate(['/articles']);
        }, 3000);
      },
      error: error => {
        console.log(error);
        this.confirmService.showAlert('Failed to Updated Article.', 'danger');
      }
    })
  }

}
