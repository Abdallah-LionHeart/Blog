import { Component } from '@angular/core';
import { Article } from '../../appModels/article';
import { ArticleService } from '../../appService/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
}
