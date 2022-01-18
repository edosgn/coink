import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PadRoutingModule } from './pad-routing.module';
import { IonicModule } from '@ionic/angular';
import { PadComponent } from './pad.component';


@NgModule({
  declarations: [
    PadComponent
  ],
  imports: [
    CommonModule,
    PadRoutingModule,
    IonicModule
  ],
  exports: [
    PadComponent
  ]
})
export class PadModule { }
