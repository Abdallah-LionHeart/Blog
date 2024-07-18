import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatButtonModule,

  ],

  exports: [
    TabsModule,
    NgxDropzoneModule,
    NgxFileDropModule,
    MatProgressBarModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
