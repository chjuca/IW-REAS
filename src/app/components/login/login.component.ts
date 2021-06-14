import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService) { }
  email: string;
  password: string;


  signIn() {
    console.log(this.email, this.password);
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
