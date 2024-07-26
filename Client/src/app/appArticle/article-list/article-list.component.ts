import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Article } from 'src/app/appModels/article';
import { ArticleParams } from 'src/app/appModels/articleParams';
import { Pagination } from 'src/app/appModels/Pagination';
import { User } from 'src/app/appModels/user';
import { ArticleService } from 'src/app/appService/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef;
  pagination!: Pagination;
  articleParams!: ArticleParams;
  articles!: Article[];
  article!: Article;
  user!: User;
  selectedFilter: string = 'recently';
  applyButtonHidden = false;
  resetButtonHidden = true;
  isFilterApplied = false;
  searchActive: boolean = false;

  constructor(private articleService: ArticleService) {
    this.articleParams = this.articleService.getArticleParams();
  }

  ngOnInit() {
    this.loadArticles();
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
    this.articleService.getPaginatedArticles(this.articleParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.articles = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  getVideoEmbed(link: string): string {
    if (link.includes('youtube.com')) {
      const videoId = link.split('v=')[1];
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    // Add more cases for different platforms if needed
    return `<a href="${link}" target="_blank">${link}</a>`;
  }

  // filterArticles(filter: string) {
  //   this.selectedFilter = filter;
  //   this.articleParams.orderBy = filter;
  //   this.articleService.setArticleParams(this.articleParams);
  //   this.loadArticles();
  // }
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
    this.articleService.setArticleParams(this.articleParams);
    // this.articleParams = new ArticleParams();
    this.loadArticles();
    this.isFilterApplied = false;
  }

  onSearch() {
    const params = this.articleService.getArticleParams();
    params.search = this.searchTerm.nativeElement.value;
    // params.pageNumber = 1;
    this.articleService.setArticleParams(params);
    this.articleParams = params;
    this.loadArticles();
    this.searchActive = true;
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.articleParams = new ArticleParams();
    this.articleService.setArticleParams(this.articleParams);
    this.loadArticles();
    this.searchActive = true;
  }

  PageChanged(event: any) {
    const params = this.articleService.getArticleParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.articleService.setArticleParams(params);
      this.articleParams = params;
      this.loadArticles();
    }
  }

  onPageChange(page: number) {
    if (this.articleParams.pageNumber !== page) {
      this.articleParams.pageNumber = page;
      this.loadArticles();
    }
  }

}






// resetFilters() {
//   this.articleParams = new ArticleParams();
//   this.loadArticles();
//   this.applyButtonHidden = false;
//   this.resetButtonHidden = true;
//   this.isFilterApplied = false;
//   return this.articleParams;
// }

// applyFilters() {
//   this.loadArticles();
//   this.isFilterApplied = true;
// }