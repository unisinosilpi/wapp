import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitalSignsFormPage } from './vital-signs-form.page';

const routes: Routes = [
  {
    path: '',
    component: VitalSignsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitalSignsFormPageRoutingModule {}
