import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { PerfilPageModule } from '../perfil/perfil.module';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/tabs/home-reservas',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home-reservas',
        loadChildren: () => import('../home-reservas/home-reservas.module').then( m => m.HomeReservasPageModule )
      },
      {
        path: 'reservas',
        loadChildren: () => import('../mis-reservas/mis-reservas.module').then( m => m.MisReservasPageModule )
      },
      {
        path: 'contacto',
        loadChildren: () => import('../contacto/contacto.module').then( m => m.ContactoPageModule )
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
