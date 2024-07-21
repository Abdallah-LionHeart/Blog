import { Component } from '@angular/core';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { PaginatedResult } from 'src/app/appModels/PaginatedResult';
import { ArticleService } from 'src/app/appService/article.service';


@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent {
  articles: ArticleDto[] = [];
  searchTerm: string = '';
  filter: string = 'recent';
  pageNumber: number = 1;
  pageSize: number = 2;
  totalItems!: number;
  // pagination: Pagination | undefined;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((data: any) => {
      this.articles = data;
    });
  }

  searchArticles() {
    if (this.searchTerm.trim() || this.filter) {
      this.articleService.searchArticles(this.searchTerm, this.pageNumber, this.pageSize, this.filter).subscribe((data: PaginatedResult<ArticleDto>) => {
        this.articles = data.items;
        this.totalItems = data.totalCount;
      });
    } else {
      this.loadArticles();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.pageNumber = 1;
    this.filter = 'recent';
    this.loadArticles();
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 1;
    this.searchArticles();
  }

  onPageChange(event: any) {
    this.pageNumber = event.page;
    this.searchArticles();
  }

  getVideoEmbed(link: string): string {
    if (link.includes('youtube.com')) {
      const videoId = link.split('v=')[1];
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    // Add more cases for different platforms if needed
    return `<a href="${link}" target="_blank">${link}</a>`;
  }
}
