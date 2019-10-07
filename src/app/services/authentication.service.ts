import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {

  }
  loginWithEmail(email:string, password:string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email,password);
  }
  registerWithEmail(email:string, password:string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password);
  }
  getStatus(){
    return this.angularFireAuth.authState;//trae el objeto de sesion de un usuario
  }
  logout(){
    return this.angularFireAuth.auth.signOut();
  }
}
