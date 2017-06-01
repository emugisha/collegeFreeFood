import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewPostPage} from "../new-post/new-post";
import {EditProfilePage} from "../edit-profile/edit-profile";
import {AuthService} from "../../providers/auth-service";
import {ResetPasswordPage} from "../reset-password/reset-password";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private loginModel={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){

    this.authService.login(this.loginModel).then((user)=>{
      this.navCtrl.push(NewPostPage);
    }).catch((error)=>{
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        //
      } else {
        //alert(errorMessage);
      }
    });
    //this.navCtrl.push(EditProfilePage);
  }

  resetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

}
