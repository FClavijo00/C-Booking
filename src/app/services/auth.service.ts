import { Injectable, NgZone } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public firestore: AngularFirestore,
    public firestoeService: FirestoreService,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone){}

  loginUser(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  authLogin(provider) {
    return this.angularFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigateByUrl('tabs');
        });
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.id}`);
    const userData: User = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      password: user.password,
      localidad: user.localidad,
      telefono: user.telefono
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async logout() {
    await this.angularFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

}
