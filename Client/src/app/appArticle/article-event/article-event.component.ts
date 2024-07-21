import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { ArticleService } from 'src/app/appService/article.service';

@Component({
  selector: 'app-article-event',
  templateUrl: './article-event.component.html',
  styleUrls: ['./article-event.component.scss']
})
export class ArticleEventComponent implements OnInit {
  events: ArticleDto[] = [];
  totalCards!: number;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage!: number;
  totalPages!: number;
  overflowWidth!: string;
  cardWidth!: string;
  @ViewChild("container", { static: true, read: ElementRef }) container!: ElementRef;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllEvents().subscribe(data => {
      this.events = data;
      this.totalCards = this.events.length;
      this.cardsPerPage = this.getCardsPerPage();
      this.initializeSlider();
    });
  }

  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * 10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage * 10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 * (this.currentPage - 1)}px)`;
  }

  getVideoEmbed(link: string): string {
    if (link.includes('youtube.com')) {
      const videoId = link.split('v=')[1];
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    return `<a href="${link}" target="_blank">${link}</a>`;
  }
}
