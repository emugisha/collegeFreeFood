import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SquadDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-squad-details',
  templateUrl: 'squad-details.html'
})
export class SquadDetailsPage {

  private placeHolderText = "Add to my squad";
  private user;
  private users ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SquadDetailsPage');
  }
  lookupUser(event){

  }

  addUser(user){

  }

}
