import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewPostPage} from "../new-post/new-post";
import {EditProfilePage} from "../edit-profile/edit-profile";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    //this.navCtrl.push(NewPostPage);
    this.navCtrl.push(EditProfilePage);

  }

}
