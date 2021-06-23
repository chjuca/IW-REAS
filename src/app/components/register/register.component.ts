import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';

import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authenticationService: AuthenticationService) { }
  email: string;
  password: string;
  confPassword: string ;
  created: Boolean;
  mensaje: string;
  user: User = {};

  

  validatePassword(){
    if(this.password == this.confPassword){
      if(this.password.length<6){
        this.created = false;
        this.mensaje = "La contraseña debe tener más de 6 caracteres";
      }else{
        this.onSingUp()
      }
    }else{
      this.created = false;
      this.mensaje = "Las contraseñas no coinciden"
    }
  }


  async onSingUp(){
    
    await this.authenticationService.SignUp(this.email, this.password)
      if(this.authenticationService.isLoggedIn){
       this.user.email = this.email
        this.authenticationService.addUser(this.user)
        this.mensaje = "Registrado Correctamente"
        this.created = true;
        console.log(this.mensaje)
      }else{
        this.mensaje = this.authenticationService.mensaje;
        this.created = false;
      }
      console.log(this.authenticationService.isLoggedIn)
    }
  
  signOut() {
    this.authenticationService.SignOut();
  }
}
