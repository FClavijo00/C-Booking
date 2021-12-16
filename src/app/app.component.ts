import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor(private firestore: AngularFirestore,
    private auth: AuthService,
    private menuCtrl: MenuController) {}

  cerrarSesion() {
    this.auth.logout();
    this.menuCtrl.close('main-menu');
    console.log('Sesión cerrada con éxito');
  }

  cerrarMenu() {
    this.menuCtrl.close('main-menu');
  }
}
