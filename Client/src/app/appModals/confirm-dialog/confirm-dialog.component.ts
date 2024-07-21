import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title = '';
  message = '';
  btnOkText = '';
  btnCancelText = '';
  result!: boolean;

  /**
   *
   */
  constructor(public bsModalRef: BsModalRef) {

  }

  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }

  decline() {
    // this.result = false;
    this.bsModalRef.hide();
  }
}
