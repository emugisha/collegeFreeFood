import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";

/*
  Generated class for the AlertService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertService {

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello AlertService Provider');
  }

  showAlert(title, message,buttonText){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [buttonText]
      });
      alert.present();
  }


}
