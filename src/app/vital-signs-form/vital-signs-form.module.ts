import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitalSignsFormPageRoutingModule } from './vital-signs-form-routing.module';

import { VitalSignsFormPage } from './vital-signs-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalSignsFormPageRoutingModule
  ],
  declarations: [VitalSignsFormPage]
})
export class VitalSignsFormPageModule {}
