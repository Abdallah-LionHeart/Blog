import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/appModels/article';
import { ArticleService } from 'src/app/appService/article.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  articleId!: number;
  article!: Article;
  constructor(private articleService: ArticleService, private bcService: BreadcrumbService, private route: ActivatedRoute,) { }


  loadArticle() {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticleById(this.articleId).subscribe({
      next: article => {
        this.article = article,
          this.bcService.set('@articleDetails', article.headline)
      }
    })
  }

}
