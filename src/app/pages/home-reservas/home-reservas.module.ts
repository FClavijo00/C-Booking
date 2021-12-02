import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeReservasPageRoutingModule } from './home-reservas-routing.module';

import { HomeReservasPage } from './home-reservas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeReservasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomeReservasPage]
})
export class HomeReservasPageModule {}
