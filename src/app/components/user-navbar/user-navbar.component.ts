import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  
  constructor(private authenticationService: AuthenticationService) {
 
   }
   usuario= {} as User ;
   subscription: Subscription;
   reload = false;

  ngOnInit() {


   const user = JSON.parse(localStorage.getItem('user'))

   if(localStorage.getItem('user') != null){
     this.subscription = this.authenticationService.getRolFromEmail(user["email"]).subscribe(usuario =>{
       this.usuario = usuario

     })
   }else{
    this.usuario.rol = ""
    
  
  
  
    }

}

async SignOut() {
 
 
  this.usuario.rol = ""
   this.authenticationService.SignOut();
   this.reload = true;
   window.location.href = "/home"
}
}


