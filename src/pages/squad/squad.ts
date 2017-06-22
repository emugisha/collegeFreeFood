import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewSquadPage} from "../new-squad/new-squad";
import {SquadDetailsPage} from "../squad-details/squad-details";

/*
  Generated class for the Squad page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-squad',
  templateUrl: 'squad.html'
})
export class SquadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SquadPage');
  }
  createNewSquad(){
    this.navCtrl.push(NewSquadPage);
  }
  viewSquad(){
    this.navCtrl.push(SquadDetailsPage)
  }

}
