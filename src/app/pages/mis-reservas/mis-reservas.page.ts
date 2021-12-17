import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
})
export class MisReservasPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;

  @Input() reserva: Reserva;

  public reservas: Observable<Reserva[]>;
  selectedReserva: Reserva;

  constructor(private firestore: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.reservas = this.firestore.getReservas();
    //.pipe(tap(reservas => this.selectedReserva = reservas[0]));
  }

  select(reserva: Reserva) {
    this.selectedReserva = reserva;
    this.selectedReserva.id = reserva.id;
    console.log(this.selectedReserva);
  }

  delete() {
    this.firestore.deleteReserva(this.selectedReserva).then( _ => {
      this.router.navigateByUrl('/tabs');
    });
    this.ionList.closeSlidingItems();
  }

}
