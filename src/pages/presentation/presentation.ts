import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";

/*
  Generated class for the Presentation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html'
})
export class PresentationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

  goToHome(){
    this.navCtrl.push(LoginPage);
  }

}
