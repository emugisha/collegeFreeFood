import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthService) {

  }

  ionViewDidLoad(){
    this.authService.getAuth().onAuthStateChanged(
      (user)=>{
        if(user) {
          console.log(user);
          } else{
          this.navCtrl.push(LoginPage);
        }
      },
      (error)=>{
        console.log('error occurred');
        console.log(error);
      }
    );
}

goToMenu(){
  this.navCtrl.push(MenuPage);
}

}
