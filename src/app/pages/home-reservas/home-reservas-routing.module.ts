import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeReservasPage } from './home-reservas.page';

const routes: Routes = [
  {
    path: '',
    component: HomeReservasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeReservasPageRoutingModule {}
