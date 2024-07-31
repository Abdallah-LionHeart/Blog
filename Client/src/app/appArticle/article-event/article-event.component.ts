import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { faArrowLeftLong, faArrowRightLong, faCircleInfo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ArticleDto } from 'src/app/appModels/articleDto';
import { ArticleService } from 'src/app/appService/article.service';
declare var $: any;
@Component({
  selector: 'app-article-event',
  templateUrl: './article-event.component.html',
  styleUrls: ['./article-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleEventComponent implements OnInit {
  events: ArticleDto[] = [];
  article!: ArticleDto;
  truncatedHeadline: string = '';
  @ViewChild("container", { static: true, read: ElementRef }) container!: ElementRef;
  faArrowRightLong = faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;
  faEdit = faEdit;
  faCircleInfo = faCircleInfo

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticleEvent();


  }
  loadArticleEvent() {
    this.articleService.getAllEvents().subscribe({
      next: data => {
        this.events = data
      }
    })
  }

  ngAfterViewInit() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      dots: false,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
  }

  prevSlide() {
    $('.owl-carousel').trigger('prev.owl.carousel');
  }

  nextSlide() {
    $('.owl-carousel').trigger('next.owl.carousel');
  }

}
