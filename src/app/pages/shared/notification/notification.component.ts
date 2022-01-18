import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() options: any;

  response: any;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss(this.response);
  }

  close(){
    this.response = {
      code: 204,
      message: 'Cancelado por el usuario',
      data: null
    }

    this.dismissModal();
  }

  getMethod(method: string){
    this.response = {
      code: 200,
      message: 'Acción de botón activado',
      method: method
    }

    this.dismissModal();
  }

}
