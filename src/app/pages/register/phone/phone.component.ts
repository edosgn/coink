import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoinkService } from 'src/app/services/coink.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { ToastService } from 'src/app/services/toast.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  @Output() directionEvent = new EventEmitter<any>();
  @Output() eventFormPhone = new EventEmitter<any>();

  formPhone: FormGroup;
  typePad: string = 'full_disable';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private encryptService: EncryptService,
    private coinkService: CoinkService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.formPhone = this.formBuilder.group({
      number: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(11)]),
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  next() {
    this.eventFormPhone.emit('next');
  }

  padEvent(data: any) {
    switch (data.type) {
      case 'number':
        if (this.formPhone.get('number').value && this.formPhone.get('number').value.length < 11) {
          if (this.formPhone.get('number').value.length == 3) {
            this.formPhone.patchValue({
              number: this.formPhone.get('number').value + ' '
            });
          }

          this.formPhone.patchValue({
            number: this.formPhone.get('number').value + data.value
          });
        } else if (!this.formPhone.get('number').value) {
          this.formPhone.patchValue({
            number: data.value
          });
        }

        break;

      case 'button':
        switch (data.method) {
          case 'backspace':
            if (this.formPhone.get('number').value) {
              var newNumber = this.formPhone.get('number').value.substring(0, this.formPhone.get('number').value.length - 1);

              this.formPhone.patchValue({
                number: newNumber
              });
            }

            break;

          case 'check_enable':
            this.sendVerificationNumber();

            break;
        }

        break;
    }

    this.checkButtonValidation();
  }

  sendVerificationNumber() {
    this.toastService.presentLoading('Verificando número de telefono, por favor espere unos momentos!!');

    var phoneNumber = this.formPhone.get('number').value.replace(' ', '');

    var data = {
        phone_number: "57"+ phoneNumber,
        log_signup_id: ""
    }   

    var payloadEncrypt = this.encryptService.encrypt(JSON.stringify(data), environment.coink.cryptoKey);

    this.coinkService.verificationNumber({ payload: payloadEncrypt }).subscribe(async response => {
      var payloadDecrypt = await this.encryptService.decrypt(response.payload, environment.coink.cryptoKey);
      payloadDecrypt = JSON.parse(payloadDecrypt);
      
      if (payloadDecrypt.verification_id) {
        let response = {
          type: 'success',
          code: 200,
          message: 'Id de verificación obtenido satisfactoriamente.',
          data: {
            phone_number: phoneNumber
          }
        }

        this.eventFormPhone.emit(response);
        //var code = await this.encryptService.decrypt(payloadDecrypt.verification_id, environment.coink.cryptoKey);
      } else {
        let response = {
          type: 'warning',
          code: 204,
          message: 'No se pudo extraer el id de verificación del payload obtenido.',
        }

        this.eventFormPhone.emit(response);
      }

      this.toastService.closeLoading();
    }, (error) => {
      console.log('Error al verificar número de telefono', error.message);
      
      this.toastService.openToast(
        'Error!!',
        'No se pudo verificar el telefono, número no válido.',
        'danger'
      );

      this.toastService.closeLoading();
    });
  }

  checkButtonValidation() {
    if (this.formPhone.get('number').value && this.formPhone.get('number').value.length == 11) {
      this.typePad = 'full_enable';
    } else {
      this.typePad = 'full_disable';
    }
  }

}
