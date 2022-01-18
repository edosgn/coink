import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss'],
})
export class AgreementComponent implements OnInit {
  @Output() directionEvent = new EventEmitter<any>();
  @Output() eventFormAgreement = new EventEmitter<any>();

  formAgreement: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.formAgreement = this.formBuilder.group({
      agreement: new FormControl (true, [Validators.required])
    });
  }

  back(){
    this.directionEvent.emit('prev');
  }

  next(){
    let options: any = {
      close: false,
      image: 'oink-regalo.svg',
      title: {
        text: '¡Bienvenido a Coink!',
        class: 'color-green-dark'
      },
      message: '¡Cuenta creada exitosamente, tu marrano ya está listo para que empieces a ahorrar!',
      buttons: [
        {
          title: 'CONTINUAR',
          class: 'btn-continue color-green-dark',
          method: 'continue'
        }
      ]
    }
    
    this.openModalNotification(options);

    let response = {
      type: 'success',
      code: 200,
      message: 'Contrato aceptado por el usuario.',
      data: this.formAgreement.value
    }

    this.eventFormAgreement.emit(response);
  }

  async openModalNotification(options: any) {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      cssClass: 'modal-notification',
      componentProps: {
        'options': options
      }
    });

    await modal.present();

    var result: any = await modal.onWillDismiss();
  }

}
