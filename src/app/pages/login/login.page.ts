import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
    this.authService.loginUser(email.value, password.value)
    .then((res) => {
      this.router.navigate(['tabs']);
      console.log('Login Completado con éxito' + ' ' + email.value + ' ' + password.value);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

}
