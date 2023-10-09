import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermAndConditionsPageRoutingModule } from './term-and-conditions-routing.module';

import { TermAndConditionsPage } from './term-and-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermAndConditionsPageRoutingModule
  ],
  declarations: [TermAndConditionsPage]
})
export class TermAndConditionsPageModule {}
