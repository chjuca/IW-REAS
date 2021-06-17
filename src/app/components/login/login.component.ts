import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(){
    console.log(this.authenticationService.isLoggedIn);
   /* if(localStorage.getItem('user')!==null){
      this.entry = true;
    }else{
      this.entry = false;
    } */
  }
  email: string;
  password: string;
  entry: Boolean;
  mensaje: string;
  subscription: Subscription;
  user: User;
 

  async signIn() {
    
    await this.authenticationService.SignIn(this.email, this.password)
    if(this.authenticationService.isLoggedIn){
      this.entry = true;

      this.authenticationService.getRolFromEmail(this.email);
      this.subscription = this.authenticationService.getRolFromEmail(this.email).subscribe(user => {
        this.user = user;
        console.log(this.user.rol)
      })
    }else{
      this.entry = false;
      this.mensaje = this.authenticationService.mensaje
    }
    
    console.log(this.authenticationService.isLoggedIn)
  }
}
