import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule,
  ],
  exports: [
    TabsModule
  ]
})
export class SharedModule { }
