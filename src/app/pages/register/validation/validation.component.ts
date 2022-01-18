import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
  @Output() directionEvent = new EventEmitter<any>();
  @Output() eventFormValidation = new EventEmitter<any>();

  formValidation: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      number: new FormControl ({value: null, disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]),
    });
  }

  back(){
    this.directionEvent.emit('prev');
  }

  next(){
    this.directionEvent.emit('next');
  }

  padEvent(data: any){
    switch (data.type) {
      case 'number':
        if (this.formValidation.get('number').value && this.formValidation.get('number').value.length < 4) {
          this.formValidation.patchValue({
            number: this.formValidation.get('number').value + data.value
          });

          this.validateLength();
        } else if(!this.formValidation.get('number').value) {
          this.formValidation.patchValue({
            number: data.value
          });
        }
        
        break;

      case 'button':
        switch (data.method) {
          case 'backspace':
            if (this.formValidation.get('number').value) {
              var newNumber = this.formValidation.get('number').value.substring(0, this.formValidation.get('number').value.length - 1);
              
              this.formValidation.patchValue({
                number: newNumber
              });
            }
            
            break;

          case 'check':
            this.next();
            
            break;
        }
        
        break;
    }
  }

  validateLength(){
    if (this.formValidation.get('number').value.length == 4){
      if (this.formValidation.get('number').value == '0000') {
        let response = {
          type: 'success',
          code: 200,
          message: 'Número de validación correcto.',
          data: {
            number_verification: this.formValidation.get('number').value
          }
        }

        this.eventFormValidation.emit(response);
      } else {
        let options: any = {
          close: true,
          image: null,
          title: {
            text: 'CÓDIGO INCORRECTO',
            class: 'text-danger'
          },
          message: 'El código que ingresaste es incorrecto, enviaremos un nuevo código a tu correo electrónico.',
          buttons: [
            {
              title: 'Reenviar código',
              class: 'btn-transparent color-green-dark',
              method: 'new-code'
            }
          ]
        }
        
        this.openModalNotification(options);
      }
    }
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

    if (result && result.code == 200 && result.method) {
      if (result.method == 'new-code') {
        this.modalController.dismiss();
      }
    }
    
  }
}
