import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }


  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale',
      // bdColor: 'rgba(255,255,2555,0)',
      color: '#333333',
      size: "default",
      bdColor: 'rgba(18,5,9,0)'
    })
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
