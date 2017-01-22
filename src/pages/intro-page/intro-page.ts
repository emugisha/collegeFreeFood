import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";

/*
  Generated class for the IntroPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'intro-page',
  templateUrl: 'intro-page.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPagePage');
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
