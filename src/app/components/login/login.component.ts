import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(){
 
   /*if(localStorage.getItem('user')!==null){
      this.entry = true;
    }else{
      this.entry = false;
    }*/
  }
  email: string;
  password: string;
  entry: Boolean;
  mensaje: string;
  subscription: Subscription;
  user: User;
  ngOnDestroy(){

  }
  async signIn() {
    
    await this.authenticationService.SignIn(this.email, this.password)
    if(this.authenticationService.isLoggedIn){
      this.entry = true;

      this.subscription = this.authenticationService.getRolFromEmail(this.email).subscribe(user => {
       this.user = user;
        //console.log(this.user.rol)
      })
    }else{
      this.entry = false;
      this.mensaje = this.authenticationService.mensaje
    }
    
    console.log(this.authenticationService.isLoggedIn)
  }
}
