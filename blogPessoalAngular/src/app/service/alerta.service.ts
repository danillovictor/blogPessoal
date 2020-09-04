import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertaComponent } from '../alerta/alerta.component';


@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private bsModalService: BsModalService) { }

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertaComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message
  }

  showAlertDanger(message: string) {
    this.showAlert(message, 'danger')
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success')
  }

  showAlertInfo(message: string) {
    this.showAlert(message, 'info')
  }

}