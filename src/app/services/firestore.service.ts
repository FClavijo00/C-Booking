import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  private collection = 'reservas';

  constructor(private firestore: AngularFirestore) {}

  /*getReservas(): Observable<Reserva[]> {
    return this.firestore.collection<Reserva>(this.collection).snapshotChanges().pipe(
      map(reservas => {
        return reservas.map(reserva=> {
          const data = reserva.payload.doc.data();
          const key = reserva.payload.doc.id;
          return {key, ...data};
        });
      })
    );

  } */

  getReserva(id: string) {
    return this.firestore.collection<Reserva>(this.collection).doc(id).get();
  }

  addReserva(reserva: Reserva) {
    return this.firestore.collection(this.collection).add(reserva);
  }

  deleteReserva(reserva: Reserva) {
    return this.firestore.collection(this.collection).doc(reserva.id).delete();
  }

  updateReserva(reserva: Reserva, id: string) {
    return this.firestore.collection<Reserva>(this.collection).doc(id).update(reserva);
  }

}
