import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/appModels/article';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { ArticleParams } from 'src/app/appModels/articleParams';
import { Pagination } from 'src/app/appModels/Pagination';
import { User } from 'src/app/appModels/user';
import { ArticleService } from 'src/app/appService/article.service';

@Component({
  selector: 'app-article-paging',
  templateUrl: './article-paging.component.html',
  styleUrls: ['./article-paging.component.scss']
})
export class ArticlePagingComponent {
  pagination!: Pagination;
  articleParams!: ArticleParams;
  articles!: Article[];
  article!: ArticleDto;
  user!: User;
  // !
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  totalPages: number = 0;
  pageNumbers: number[] = [];



  constructor(private articleService: ArticleService) {
  }

  loadArticles() {
    this.articleService.getPaginatedArticles(this.articleParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.articles = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }


  PageChanged(event: any) {
    if (this.articleParams.pageNumber !== event.page) {
      this.articleParams.pageNumber = event.page;
      this.loadArticles();
    }
  }

  pageChangedd(event: any) {
    this.articleParams.pageNumber = event.page;
    this.loadArticles();
  }

  changePage(page: number) {
    if (page !== this.pagination.currentPage) {
      this.articleParams.pageNumber = page;
      this.loadArticles();
    }
  }


}
