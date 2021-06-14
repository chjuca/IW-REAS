
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    isLoggedIn = false;
    
    userData: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.userData = angularFireAuth.authState;
    }

    email: string;
    password: string;


    async SignUp(email: string, password: string) {
        await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res=>{
                this.isLoggedIn = true
                localStorage.setItem('user', JSON.stringify(res.user))
                console.log('You are Successfully registered in!');
            }).catch(err =>{
                console.log('Something is wrong in register:', err.message);
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
            }
        );
    }



    /* Sign out */
    SignOut() {
        this.angularFireAuth
            .auth
            .signOut();
        localStorage.removeItem('user');
    }

}