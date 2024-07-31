import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatButtonModule,
    NgxPaginationModule,
    CarouselModule,
    MatIconModule,
    BreadcrumbModule,
    PaginationModule,
    ModalModule.forRoot(),
    NgxSpinnerModule.forRoot(
      {
        type: 'line-scale'
      }
    )
  ],

  exports: [
    TabsModule,
    NgxDropzoneModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatButtonModule,
    NgxPaginationModule,
    ModalModule,
    CarouselModule,
    MatIconModule,
    BreadcrumbModule,
    PaginationModule,
  ]
})
export class SharedModule { }
