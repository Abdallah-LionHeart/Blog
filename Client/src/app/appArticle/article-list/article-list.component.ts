import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Article } from 'src/app/appModels/article';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { User } from 'src/app/appModels/user';
import { ArticleService } from 'src/app/appService/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles!: Article[];
  article!: ArticleDto;
  user!: User;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe({
      next: (data: Article[]) => {
        this.articles = data || [];
      }
    })
  }

  loadArticle(id: number) {
    this.articleService.getArticleById(this.article.id).pipe(take(1)).subscribe({
      next: (response: any) => this.article = response
    })
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((data: Article[]) => {
      this.articles = data;
    });
  }


  getVideoEmbed(link: string): string {
    if (link.includes('youtube.com')) {
      const videoId = link.split('v=')[1];
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    // Add more cases for different platforms if needed
    return `<a href="${link}" target="_blank">${link}</a>`;
  }

  getArticleClass(article: any): string {
    if (article.videos.length > 0 || article.images.length > 1) {
      return 'col-12';
    } else {
      return 'col-6';
    }
  }
}
