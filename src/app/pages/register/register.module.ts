import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'swiper/angular';

import { PadModule } from '../shared/pad/pad.module';
import { NotificationModule } from '../shared/notification/notification.module';
import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';
import { PhoneComponent } from './phone/phone.component';
import { ValidationComponent } from './validation/validation.component';
import { DataComponent } from './data/data.component';
import { AgreementComponent } from './agreement/agreement.component';


@NgModule({
  declarations: [
    RegisterComponent,
    PhoneComponent,
    ValidationComponent,
    DataComponent,
    AgreementComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule,
    PadModule,
    NotificationModule
  ]
})
export class RegisterModule { }
