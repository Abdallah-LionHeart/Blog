import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.scss']
})
export class PaginationItemComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 2;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  faArrowLeftLong=faArrowLeftLong
  faArrowRightLong=faArrowRightLong
  totalPages: number = 0;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  constructor() { }

 

}
