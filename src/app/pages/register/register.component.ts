import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  formRegister: FormGroup;

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: false,
    allowTouchMove: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      phone_number: new FormControl(null, [Validators.required]),
      number_verification: new FormControl(null, [Validators.required]),
      document_type: new FormControl (null, [Validators.required]),
      document_number: new FormControl (null, [Validators.required]),
      date_expedition: new FormControl (null, [Validators.required]),
      date_birth: new FormControl (null, [Validators.required]),
      gender: new FormControl (null, [Validators.required]),
      email_text: new FormControl (null, [Validators.required]),
      email_match: new FormControl (null, [Validators.required]),
      pin_security_code: new FormControl (null, [Validators.required]),
      pin_security_match: new FormControl (null, [Validators.required]),
      agreement: new FormControl (null, [Validators.required])
    });
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }

  directionEvent(type: string) {
    switch (type) {
      case 'next':
        this.slideNext();

        break;

      case 'prev':
        this.slidePrev();

        break;
    }
  }

  eventFormPhone(response: any){
    if (response.code == 200) {
      this.formRegister.patchValue({
        phone_number: response.data.phone_number
      });

      this.slideNext();
    } else {
      this.toastService.openToast(
        'Error!!',
        'No se pudo obtener el número de telefono, '+ response.message,
        'danger'
      );
    }
  }

  eventFormValidation(response: any){
    if (response.code == 200) {
      this.formRegister.patchValue({
        number_verification: response.data.number_verification
      });

      this.slideNext();
    } else {
      this.toastService.openToast(
        'Error!!',
        'No se pudo obtener el número de verificación, '+ response.message,
        'danger'
      );
    }
  }

  eventFormData(response: any){
    if (response.code == 200) {
      this.formRegister.patchValue({
        document_type: response.data.document_type,
        document_number: response.data.document_number,
        date_expedition: response.data.date_expedition,
        date_birth: response.data.date_birth,
        gender: response.data.gender,
        email_text: response.data.email_text,
        email_match: response.data.email_match,
        pin_security_code: response.data.pin_security_code,
        pin_security_match: response.data.pin_security_match
      });

      this.slideNext();
    } else {
      this.toastService.openToast(
        'Error!!',
        'No se pudo obtener los datos de cuenta, '+ response.message,
        'danger'
      );
    }
  }

  eventFormAgreement(response: any){
    if (response.code == 200) {
      this.formRegister.patchValue({
        agreement: response.data.agreement
      });

      this.send();
    } else {
      this.toastService.openToast(
        'Error!!',
        'No se pudo obtener la aceptación del contrato, '+ response.message,
        'danger'
      );
    }
  }

  send(){
    if (this.formRegister.valid) {
      console.log('Datos del formulario registro: ', this.formRegister.value);
    } else {
      this.toastService.openToast(
        'Error!!',
        'Los datos del formulario son incorrectos, por favor revise los datos registrados.',
        'danger'
      );
    }
  }

}
