
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    isLoggedIn = false;
    mensaje = "";
    rol = "";
    COLLECTION_NAME_USERS = 'users';
    userCollection: AngularFirestoreCollection;
    subscription: Subscription;
    user: User
    userInfo: User
    

    constructor(private angularFireAuth: AngularFireAuth, private db: AngularFirestore) {
       
    }

      getRolFromEmail(id: string) {
        this.userCollection = this.db.collection(this.COLLECTION_NAME_USERS);
        this.subscription = this.userCollection.doc(id).valueChanges().subscribe(user => {
            this.userInfo = user;
            this.userInfo.email = id
            console.log(this.userInfo.rol);
          })
        
        return this.userCollection.doc(id).valueChanges();

      }
      
      getRol(id: string) {
        this.userCollection = this.db.collection(this.COLLECTION_NAME_USERS);
        this.subscription = this.userCollection.doc(id).valueChanges().subscribe(user => {
            this.userInfo = user;
            this.userInfo.email = id
            //console.log(this.userInfo.rol);
          })
        
        return this.userInfo

      }
  
      
    addUser(user: User) {
        this.userCollection = this.db.collection(this.COLLECTION_NAME_USERS);
        user.rol = "estudiante";
        this.userCollection.doc(user.email).set(user);
     
      } 

    async SignUp(email: string, password: string) {
        await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res=>{
                this.isLoggedIn = true
                localStorage.setItem('user', JSON.stringify(res.user))
                console.log('You are Successfully registered in!');
            }).catch(err =>{
                console.log('Something is wrong in register:', err.message);
                this.mensaje = err.message
            }
        );
    }

    /* Sign in */
    async SignIn(email: string, password: string) {
     
        await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res=>{
                this.isLoggedIn = true
                localStorage.setItem('user', JSON.stringify(res.user))
                console.log('You are Successfully logged in!');
            }).catch(err =>{
                console.log('Something is wrong:', err.message);
                this.mensaje = err.message

            }  
            );
        
    }



    /* Sign out */
    async SignOut() {
      this.angularFireAuth.auth.signOut();
      localStorage.removeItem('user');
    }

}