import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditProfilePage} from "../edit-profile/edit-profile";
import {NotificationPage} from "../notification/notification";
import {SquadPage} from "../squad/squad";
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  gotoProfile(){
    this.navCtrl.push(EditProfilePage);
  }
  gotoNotifications(){
    this.navCtrl.push(NotificationPage);
  }

  gotoSquads(){
    this.navCtrl.push(SquadPage);
  }

  private logout(){
    this.authService.logout().then((success)=>{
      this.navCtrl.push(LoginPage);
    },
    error=>console.log('Could Not Log you out'));
  }

  private deleteAccount(){
    /*let user = this.authService.getAuth().currentUser;
    user.delete().then(success=>{

    },error=>console.log('Unable to log the user out'));*/
    this.navCtrl.push(RegisterPage);
  }

}
