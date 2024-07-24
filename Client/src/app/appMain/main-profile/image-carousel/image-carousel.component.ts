import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  images:string[] =[
    "https://themefisher.com/blog/bloxer.webp",
    "https://themefisher.com/blog/magala.webp",
    "https://themefisher.com/blog/bloxer.webp"
  ]

}
