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
  // @ViewChild('search') searchTerm!: ElementRef;
  // pagination!: Pagination;
  // articleParams!: ArticleParams;
  // articles!: Article[];
  // article!: Article;
  // user!: User;
  // selectedFilter: string = 'recently';
  // applyButtonHidden = false;
  // resetButtonHidden = true;
  // isFilterApplied = false;
  // searchActive: boolean = false;

  // constructor(private articleService: ArticleService) {
  //   this.articleParams = this.articleService.getArticleParams();
  // }

  // ngOnInit() {
  //   this.loadArticles();
  //   this.articleService.getAllArticles().subscribe({
  //     next: (data: Article[]) => {
  //       this.articles = data || [];
  //     }
  //   })
  // }

  // loadArticle(id: number) {
  //   this.articleService.getArticleById(this.article.id).pipe(take(1)).subscribe({
  //     next: (response: any) => this.article = response
  //   })
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

  // getVideoEmbed(link: string): string {
  //   if (link.includes('youtube.com')) {
  //     const videoId = link.split('v=')[1];
  //     return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  //   }
  //   // Add more cases for different platforms if needed
  //   return `<a href="${link}" target="_blank">${link}</a>`;
  // }

  // // filterArticles(filter: string) {
  // //   this.selectedFilter = filter;
  // //   this.articleParams.orderBy = filter;
  // //   this.articleService.setArticleParams(this.articleParams);
  // //   this.loadArticles();
  // // }
  // filterArticles(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const filter = selectElement.value;
  //   this.selectedFilter = filter;
  //   this.articleParams.orderBy = filter;
  //   this.articleService.setArticleParams(this.articleParams);
  //   this.loadArticles();
  // }

  // resetFilters() {
  //   this.articleParams.orderBy = 'recently';
  //   this.articleService.setArticleParams(this.articleParams);
  //   // this.articleParams = new ArticleParams();
  //   this.loadArticles();
  //   this.isFilterApplied = false;
  // }

  // onSearch() {
  //   const params = this.articleService.getArticleParams();
  //   params.search = this.searchTerm.nativeElement.value;
  //   // params.pageNumber = 1;
  //   this.articleService.setArticleParams(params);
  //   this.articleParams = params;
  //   this.loadArticles();
  //   this.searchActive = true;
  // }

  // onReset() {
  //   if (this.searchTerm) this.searchTerm.nativeElement.value = '';
  //   this.articleParams = new ArticleParams();
  //   this.articleService.setArticleParams(this.articleParams);
  //   this.loadArticles();
  //   this.searchActive = true;
  // }

  // PageChanged(event: any) {
  //   const params = this.articleService.getArticleParams();
  //   if (params.pageNumber !== event) {
  //     params.pageNumber = event;
  //     this.articleService.setArticleParams(params);
  //     this.articleParams = params;
  //     this.loadArticles();
  //   }
  // }

  // onPageChange(page: number) {
  //   if (this.articleParams.pageNumber !== page) {
  //     this.articleParams.pageNumber = page;
  //     this.loadArticles();
  //   }
  // }

  @ViewChild('search') searchTerm!: ElementRef;
  pagination: Pagination = { totalItems: 0, itemsPerPage: 2, currentPage: 1, totalPages: 0 };
  articleParams: ArticleParams = { orderBy: 'recently', pageNumber: 1, pageSize: 2, search: '' };
  articles: Article[] = [];
  selectedFilter: string = 'recently';
  searchActive: boolean = false;
  STATIC_ARTICLES: Article[] =[
    {
    "id": 12,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "publishDate": "2024-07-26T16:37:24.3832686",
    "headline": "testing vido player",
    "isEvent": false,
    "youTubeLink": null,
    "facebookLink": null,
    "images": [
    {
    "id": 10,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1722011849/blog/e1d63b2hbf0lfttmn1as.jpg",
    "publicId": "blog/e1d63b2hbf0lfttmn1as"
    },
    {
    "id": 11,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1722011851/blog/h21jkdqhkrikks2legvl.jpg",
    "publicId": "blog/h21jkdqhkrikks2legvl"
    }
    ],
    "videos": [
    {
    "id": 9,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/video/upload/v1722011866/blog/ji1unhli7gl8pevermpw.mp4",
    "isExternal": false,
    "publicId": "blog/ji1unhli7gl8pevermpw"
    }
    ]
    },
    {
    "id": 11,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "publishDate": "2024-07-25T22:50:53.2367769",
    "headline": "testing vido player",
    "isEvent": false,
    "youTubeLink": null,
    "facebookLink": null,
    "images": [
    {
    "id": 9,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1721947866/blog/lpg5mrq6phm1c9ncd9bi.jpg",
    "publicId": "blog/lpg5mrq6phm1c9ncd9bi"
    }
    ],
    "videos": [
    {
    "id": 8,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/video/upload/v1721947885/blog/vrmeu2igttamal2fmrv5.mp4",
    "isExternal": false,
    "publicId": "blog/vrmeu2igttamal2fmrv5"
    }
    ]
    },
    {
    "id": 10,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a.",
    "publishDate": "2024-07-25T22:50:41.4976872",
    "headline": "testing vido player",
    "isEvent": false,
    "youTubeLink": null,
    "facebookLink": null,
    "images": [
    {
    "id": 8,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1721947847/blog/qfw8efgxdbc1qkbn2cpm.jpg",
    "publicId": "blog/qfw8efgxdbc1qkbn2cpm"
    }
    ],
    "videos": [
    {
    "id": 7,
    "url":
   "https://res.cloudinary.com/dlfn7tqlb/video/upload/v1721947864/blog/czen317exlbmwqmcmrlt.mp4",
    "isExternal": false,
    "publicId": "blog/czen317exlbmwqmcmrlt"
    }
    ]
    },
    {
    "id": 9,
    "title": "Vestibulum eu leo accumsan, congue erat fermentum, blandit magna.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "publishDate": "2024-07-25T22:33:04.8117343",
    "headline": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante orci. Maecenas at ",
    "isEvent": false,
    "youTubeLink": "https://youtu.be/dlHtjDc1z8E?si=uIRdU6tes4OYvKAD",
    "facebookLink": "",
    "images": [
    {
    "id": 7,
    "url": "https://images.pexels.com/photos/27077981/pexels-photo-27077981/free-photo-ofcurrants-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "publicId": null
    }
    ],
    "videos": [
    {
    "id": 6,
    "url": "https://videos.pexels.com/video-files/3058708/3058708-sd_640_360_24fps.mp4",
    "isExternal": false,
    "publicId": null
    }
    ]
    },
    {
    "id": 8,
    "title": "Regular Article 2",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante orci. Maecenas at",
    "publishDate": "2024-07-25T22:33:04.811734",
    "headline": "Regular Headline 2",
    "isEvent": false,
    "youTubeLink": "https://youtu.be/dlHtjDc1z8E?si=uIRdU6tes4OYvKAD",
    "facebookLink": "",
    "images": [
    {
    "id": 6,
    "url": "https://images.pexels.com/photos/27077981/pexels-photo-27077981/free-photo-ofcurrants-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "publicId": null
    }
    ],
    "videos": []
    },
    {
    "id": 7,
    "title": "Regular Article 2",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "publishDate": "2024-07-25T22:33:04.8117337",
    "headline": "Regular Headline 2",
    "isEvent": false,
    "youTubeLink": "",
    "facebookLink": "",
    "images": [],
    "videos": [
    {
    "id": 4,
    "url": "https://videos.pexels.com/video-files/3126661/3126661-sd_640_360_24fps.mp4",
    "isExternal": false,
    "publicId": null
    },
    {
    "id": 5,
    "url": "https://youtu.be/lWo2WLVCHfE?si=sXL50kFjdS9KOHFh",
    "isExternal": true,
    "publicId": null
    }
    ]
    },
    {
    "id": 6,
    "title": "Regular Article 2",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "publishDate": "2024-07-25T22:33:04.8117335",
    "headline": "Regular Headline 2",
    "isEvent": false,
    "youTubeLink": "https://youtu.be/x_GA9_Eitic?si=RsoXAdxSv-TRMICW",
    "facebookLink": "",
    "images": [],
    "videos": []
    },
    {
    "id": 5,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante orci. Maecenas at ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue lacus urna, ut ",
    "publishDate": "2024-07-25T22:33:04.8117329",
    "headline": "Regular Headline 2",
    "isEvent": false,
    "youTubeLink": "",
    "facebookLink": "",
    "images": [],
    "videos": []
    }
   ];
  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    const filteredArticles = this.filterAndSearchArticles(this.STATIC_ARTICLES);
    this.pagination.totalItems = filteredArticles.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    this.articles = filteredArticles.slice(
      (this.pagination.currentPage - 1) * this.pagination.itemsPerPage,
      this.pagination.currentPage * this.pagination.itemsPerPage
    );
  }

  filterAndSearchArticles(articles: Article[]): Article[] {
    let filtered = articles;

    if (this.articleParams.search) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(this.articleParams.search.toLowerCase()) ||
        article.content.toLowerCase().includes(this.articleParams.search.toLowerCase())
      );
    }

    switch (this.articleParams.orderBy) {
      case 'recently':
        filtered = filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      case 'lastWeek':
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        filtered = filtered.filter(article => new Date(article.publishDate) >= lastWeek);
        break;
      case 'lastMonth':
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        filtered = filtered.filter(article => new Date(article.publishDate) >= lastMonth);
        break;
      case 'lastDay':
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        filtered = filtered.filter(article => new Date(article.publishDate) >= lastDay);
        break;
    }

    return filtered;
  }

  filterArticles(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.articleParams.orderBy = selectElement.value;
    this.loadArticles();
  }

  resetFilters() {
    this.articleParams.orderBy = 'recently';
    this.articleParams.search = '';
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.searchActive = false;
    this.loadArticles();
  }

  onSearch() {
    this.articleParams.search = this.searchTerm.nativeElement.value;
    this.searchActive = true;
    this.loadArticles();
  }

  onReset() {
    this.resetFilters();
  }

  onPageChange(page: number) {
    if (this.pagination.currentPage !== page) {
      this.pagination.currentPage = page;
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
