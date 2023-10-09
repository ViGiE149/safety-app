import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermAndConditionsPage } from './term-and-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermAndConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermAndConditionsPageRoutingModule {}
