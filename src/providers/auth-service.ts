import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConfigService} from "./config-service";
import {AccountService} from "./account-service";

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private auth;

  constructor(public http: Http, private configService:ConfigService, public accountService:AccountService) {
    this.auth = configService.getFirebaseAuth();
  }

  createAccount(userModel){
    return this.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
  }

  login(userModel){
    return this.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
  }

  loginWithFaceBook(){

  }

  resetPassword(email){
   return this.auth.sendPasswordResetEmail(email);
  }

  isAuthenticated(){
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        return user;
      }else{
        return null;
      }
    });
  }

  getAuth(){
    this.accountService.setCurrentUser(this.auth);
    return this.auth;
  }

  logout(){
    return this.auth.signOut();
  }

  deleteUser(){
    let user = this.auth.currentUser;
    return user.delete();
  }


}
