import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {AlertService} from "../../providers/alert-service";
import {LoginPage} from "../login/login";

/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  private emailModel:string;
  private showLoginFooter:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService, public alertService:AlertService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  private resetPassword(){
    this.authService.resetPassword(this.emailModel).then(
      success=>{
        let message = "A Password reset link has been sent to your email.";
        this.alertService.showAlert('Email Sent',message,'OK');
        this.showLoginFooter=true;
      },error=>{
        if(error.code = 'auth/invalid-email'){
          let message = "Invalid Email. Please enter a valid email.";
          this.alertService.showAlert('Invalid Email',message,'OK');
        }else if(error.code = 'auth/user-not-found'){
          let message = "The email you entered does not match any user. Please try again with a different email.";
          this.alertService.showAlert('User Not Found',message,'OK');
        }else{
          let message = "An error occured. Please try again later!";
          this.alertService.showAlert('Error',message,'OK');
        }
      }
    );
  }

  private gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}
