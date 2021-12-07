import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReservasPageRoutingModule } from './mis-reservas-routing.module';

import { MisReservasPage } from './mis-reservas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisReservasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisReservasPage]
})
export class MisReservasPageModule {}
