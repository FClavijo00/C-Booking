import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
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
