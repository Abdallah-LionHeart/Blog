import { Component, Input, OnInit } from '@angular/core';
import { faArrowRightLong, faArrowLeftLong, faCircleInfo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/appModels/article';
import { Artical } from 'src/app/interfaces/artical';

@Component({
  selector: 'app-artical-item',
  templateUrl: './artical-item.component.html',
  styleUrls: ['./artical-item.component.scss']
})
export class ArticalItemComponent implements OnInit {
  @Input() article!: Artical;
  currentSlide: number = 0;
  faCircleInfo=faCircleInfo;
  faEdit= faEdit;
  media: string[] = [];
  faArrowRightLong =faArrowRightLong;
  faArrowLeftLong = faArrowLeftLong;
  ngOnInit(): void {
    this.media = [...this.article.images, ...this.article.youtube];
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.media.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.media.length) % this.media.length;
  }
  constructor() { }



}
