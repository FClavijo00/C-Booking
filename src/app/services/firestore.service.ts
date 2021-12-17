import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  private collectionReservas = 'reservas';

  private collectionUsers = 'users';

  constructor(private firestore: AngularFirestore) {}

  getReservas(): Observable<Reserva[]> {
    return this.firestore.collection<Reserva>(this.collectionReservas).valueChanges();

  }

  getReserva(id: string) {
    return this.firestore.collection<Reserva>(this.collectionReservas).doc(id).get();
  }

  addReserva(reserva: Reserva) {
    return this.firestore.collection(this.collectionReservas).add(reserva);
  }

  deleteReserva(reserva: Reserva) {
    return this.firestore.collection(this.collectionReservas).doc(reserva.id).delete();
  }

  updateReserva(reserva: Reserva, id: string) {
    return this.firestore.collection<Reserva>(this.collectionReservas).doc(id).update(reserva);
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>(this.collectionUsers).valueChanges();
  }

  getUser(id: string) {
    return this.firestore.collection<User>(this.collectionUsers).doc(id).get();
  }

  addUser(user: User) {
    return this.firestore.collection(this.collectionUsers).add(user);
  }

}
