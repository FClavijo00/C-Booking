import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  id: string;
  editMode = false;

  userForm: FormGroup = new FormGroup( {
    email : new FormControl('', [Validators.required]),
    nombre : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
    localidad : new FormControl('', [Validators.required]),
    telefono : new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activatedRouter.snapshot.paramMap.has('id')) {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.editMode = true;
      this.firestoreService.getUser(this.id).subscribe(
        editUser => {
          const user: User = editUser.data();
          this.userForm.get('email').setValue(user.email);
          this.userForm.get('nombre').setValue(user.nombre);
          this.userForm.get('password').setValue(user.password);
          this.userForm.get('localidad').setValue(user.localidad);
          this.userForm.get('telefono').setValue(user.telefono);
        }
      );
    }
  }

  saveUser() {
    if (this.userForm.valid) {
      const user: User = {
        email : this.userForm.get('email').value,
        nombre : this.userForm.get('nombre').value,
        password : this.userForm.get('password').value,
        localidad : this.userForm.get('localidad').value,
        telefono : this.userForm.get('telefono').value,
      };
      if (this.editMode) {
        console.log('EditMode');
      } else {
        this.firestoreService.addUser(user).then( _ => {
          this.router.navigateByUrl('login');
          console.log('Usuario correctamente creado');
        });
      }
    }
  }

  signUp(email, password) {
    this.authService.registerUser(email.value, password.value)
    .then((res) => {
      this.router.navigate(['login']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

}
