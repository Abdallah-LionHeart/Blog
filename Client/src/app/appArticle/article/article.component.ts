import { Component } from '@angular/core';
import { Article } from '../../appModels/article';
import { ArticleService } from '../../appService/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  articles!: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((data: Article[]) => {
      this.articles = data;
    });
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.loadArticles();
    });
  }
}
