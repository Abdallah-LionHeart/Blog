import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../appModels/article';
import { ArticleService } from '../../appService/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  articleForm: FormGroup;
  articleId!: number;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.articleId = +this.route.snapshot.paramMap.get('id');
    if (this.articleId) {
      this.articleService.getArticleById(this.articleId).subscribe((article: Article) => {
        this.articleForm.patchValue(article);
      });
    }
  }

  // saveArticle() {
  //   const article: Article = this.articleForm.value;
  //   if (this.articleId) {
  //     this.articleService.updateArticle(this.articleId, article).subscribe(() => {
  //       this.router.navigate(['/articles']);
  //     });
  //   } else {
  //     this.articleService.addArticle(article).subscribe(() => {
  //       this.router.navigate(['/articles']);
  //     });
  //   }
  // }

  onFileChange(event: any, type: 'image' | 'video') {
    const file = event.target.files[0];
    if (file) {
      if (type === 'image') {
        this.articleService.addImage(this.articleId, file).subscribe();
      } else {
        this.articleService.addVideo(this.articleId, file).subscribe();
      }
    }
  }

  addYoutubeVideo(url: string) {
    this.articleService.addYoutubeVideo(this.articleId, url).subscribe();
  }
}
