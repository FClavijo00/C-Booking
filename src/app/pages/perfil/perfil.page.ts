import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  id: string;
  user: User;

  constructor(private firestoreService: FirestoreService) { }



  ngOnInit(): void {
    this.firestoreService.getUser(this.id);
  }


}
