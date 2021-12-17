/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.page.html',
  styleUrls: ['./add-reserva.page.scss'],
})

export class AddReservaPage implements OnInit {

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    ) { }

  reservaForm: FormGroup = new FormGroup( {
    instalacion : new FormControl('', [Validators.required]),
    fecha : new FormControl('', [Validators.required]),
    hora : new FormControl('', [Validators.required]),
    localidad : new FormControl('', [Validators.required]),
  });

  id: string;
  editMode = false;

  ngOnInit(): void {
    if (this.activatedRouter.snapshot.paramMap.has('id')) {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.editMode = true;
      this.firestoreService.getReserva(this.id).subscribe(
        editReserva => {
          const reserva: Reserva = editReserva.data();
          this.reservaForm.get('instalacion').setValue(reserva.instalacion);
          this.reservaForm.get('fecha').setValue(reserva.fecha);
          this.reservaForm.get('hora').setValue(reserva.hora);
          this.reservaForm.get('localidad').setValue(reserva.localidad);
        }
      );
    }
  }

  save() {
    if (this.reservaForm.valid) {
      const reserva: Reserva = {
        instalacion : this.reservaForm.get('instalacion').value,
        fecha : this.reservaForm.get('fecha').value,
        hora : this.reservaForm.get('hora').value,
        localidad : this.reservaForm.get('localidad').value,
      };
      if (this.editMode) {
        this.firestoreService.updateReserva(reserva, this.id).then( _ => {
          this.router.navigateByUrl('tabs/reservas');
        });
      } else {
        this.firestoreService.addReserva(reserva).then( _ => {
          this.router.navigateByUrl('tabs/reservas');
        });
      }
    }
  }

}

