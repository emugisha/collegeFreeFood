import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the ConfigService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigService {

  constructor(public http: Http) {
  }

  initializeFirebase(){
    const config = {
      apiKey: "AIzaSyD1Tw87FykYkYgzVd50FPRH5tJsO7A5W2Y",
      authDomain: "collegefreefood-ee23c.firebaseapp.com",
      databaseURL: "https://collegefreefood-ee23c.firebaseio.com",
      storageBucket: "collegefreefood-ee23c.appspot.com",
      messagingSenderId: "597155386288"
    };

    firebase.initializeApp(config);
  }

  getFirebaseAuth(){
   return firebase.auth();
  }

  getFirebaseDatabase(){
     return firebase.database();
  }

  getFirebaseStorage(){
    return firebase.storage();
  }

}
