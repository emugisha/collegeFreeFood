import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the NewSquad page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-squad',
  templateUrl: 'new-squad.html'
})
export class NewSquadPage {

  private profilePicture;
  private placeHolderText = "Add to my squad";
  private user=null;
  private users ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.profilePicture = "../assets/intro/dummy.png";
  }
  lookupUser(event){

  }

}
