import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Article } from 'src/app/appModels/article';
import { ArticleParams } from 'src/app/appModels/articleParams';
import { Pagination } from 'src/app/appModels/Pagination';
import { ArticleService } from 'src/app/appService/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleListComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef;
  pagination: Pagination = { totalItems: 0, itemsPerPage: 2, currentPage: 1, totalPages: 0 };
  // pagination!: Pagination;
  articleParams: ArticleParams;
  articles: Article[] = [];
  article!: Article;
  selectedFilter: string = 'recently';
  searchActive: boolean = false;


  constructor(private articleService: ArticleService) {
    this.articleParams = this.articleService.getArticleParams();
  }



  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    if (this.articleParams) {
      this.articleService.setArticleParams(this.articleParams);
      this.articleService.getPaginatedArticles(this.articleParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.articles = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }


  filterArticles(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const filter = selectElement.value;
    this.selectedFilter = filter;
    this.articleParams.orderBy = filter;
    this.articleService.setArticleParams(this.articleParams);
    this.loadArticles();
  }

  resetFilters() {
    this.articleParams.orderBy = 'recently';
    this.articleService.resetArticleParams();
    this.loadArticles();
  }

  onSearch() {
    const params = this.articleService.getArticleParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.articleService.setArticleParams(params);
    this.articleParams = params;
    this.loadArticles();
    this.searchActive = true;
  }

  onReset() {
    this.articleParams.search = '';
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.articleParams = new ArticleParams();
    this.articleService.setArticleParams(this.articleParams);
    this.loadArticles();
    this.searchActive = false;
  }


  PageChanged(event: any) {
    if (this.articleParams.pageNumber && this.articleParams.pageNumber !== event.page) {
      this.articleParams.pageNumber = event.page;
      this.articleService.setArticleParams(this.articleParams);
      this.loadArticles();
    }
  }

}

