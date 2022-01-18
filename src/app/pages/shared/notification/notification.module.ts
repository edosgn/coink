import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    IonicModule
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }
