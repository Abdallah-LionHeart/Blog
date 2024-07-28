import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
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
  // pagination!: Pagination;
  // articleParams!: ArticleParams;
  // articles!: Article[];
  // article!: ArticleDto;
  // user!: User;

  // @Input() totalItems: number = 0;
  // @Input() itemsPerPage: number = 2;
  // @Input() currentPage: number = 1;
  // @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  // faArrowLeftLong = faArrowLeftLong
  // faArrowRightLong = faArrowRightLong
  // totalPages: number = 0;

  // /**
  //  *
  //  */
  // constructor(private articleService: ArticleService) {


  // }

  // ngOnInit(): void {
  //   this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
  // }
  // loadArticles() {
  //   this.articleService.getPaginatedArticles(this.articleParams).subscribe({
  //     next: response => {
  //       if (response.result && response.pagination) {
  //         this.articles = response.result;
  //         this.pagination = response.pagination;
  //       }
  //     }
  //   })
  // }

  // PageChanged(event: any) {
  //   if (this.articleParams.pageNumber !== event.page) {
  //     this.articleParams.pageNumber = event.page;
  //     this.loadArticles();
  //   }
  // }



  // get pages(): number[] {
  //   return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  // }


  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  totalPages: number = 0;
  pageNumbers: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["totalItems"] || changes?.['itemsPerPage'] || changes?.['currentPage']) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }


}
