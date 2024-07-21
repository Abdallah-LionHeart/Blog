import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../appModals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef<ConfirmDialogComponent> = new BsModalRef<ConfirmDialogComponent>();
  alertMessage: string = '';
  alertType: string = '';
  constructor(private modalservice: BsModalService) { }

  confirm(title = 'Confirmation', message = 'Are You sure? Your Article Will discard.', btnOkText = 'Ok', btnCancelText = 'Cancel'): Observable<boolean> {
    const config = {
      initialState: {
        title, message, btnOkText, btnCancelText
      }
    }
    this.bsModalRef = this.modalservice.show(ConfirmDialogComponent, config);
    return this.bsModalRef.onHidden!.pipe(
      map(() => {
        return this.bsModalRef.content!.result;
      })
    )
  }


  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}
