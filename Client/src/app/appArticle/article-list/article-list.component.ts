import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { User } from 'src/app/appModels/user';
import { ArticleService } from 'src/app/appService/article.service';
import { Artical } from 'src/app/interfaces/artical';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  // articles!: Article[];
  // article!: ArticleDto;
  // user!: User;

  // constructor(private articleService: ArticleService) { }

  // ngOnInit() {
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
  //   this.articleService.getAllArticles().subscribe((data: Article[]) => {
  //     this.articles = data;
  //   });
  // }


  // getVideoEmbed(link: string): string {
  //   if (link.includes('youtube.com')) {
  //     const videoId = link.split('v=')[1];
  //     return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  //   }
  //   // Add more cases for different platforms if needed
  //   return `<a href="${link}" target="_blank">${link}</a>`;
  // }

  // getArticleClass(article: any): string {
  //   if (article.videos.length > 0 || article.images.length > 1) {
  //     return 'col-12';
  //   } else {
  //     return 'col-6';
  //   }
  // }ngOnInit(): void {
    
// }
  articles: Artical[] = [
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "2024-01-13",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "2024-06-25",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "2023-01-13",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "2024-07-25",
      images: [
        "assets/images/event4.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event4.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event4.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Hello From new arrtical ",
      date: "13 Jan 2024",
      images: [
        "assets/images/event4.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event4.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event3.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
    {
      title: "Our top 10 Javascript frameworks to use",
      date: "13 Jan 2024",
      images: [
        "assets/images/event1.jpeg",
        "assets/images/event2.jpeg"
      ],
      youtube: [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ],
      author: "Drew Cano"
    },
  ];

  filteredArticles: Artical[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  ngOnInit(): void {
    this.filteredArticles = this.articles;
  }

  get paginatedArticles(): Artical[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredArticles.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  filterArticles(filter: string): void {
    const now = new Date();
    this.filteredArticles = this.articles.filter(article => {
      const articleDate = new Date(article.date);
      switch (filter) {
        case 'recently':
          return articleDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
        case 'lastWeek':
          return articleDate >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) &&
                 articleDate < new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case 'lastMonth':
          return articleDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) &&
                 articleDate < new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        case 'oldest':
          return articleDate < new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    });
  }

  searchArticles(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.author.toLowerCase().includes(searchTerm)
    );
  }
}