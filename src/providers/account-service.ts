import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConfigService} from "./config-service";

/*
  Generated class for the AccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountService {

  private usersRef;
  private dataRef;
  private collegesRef;

  constructor(public http: Http, configService:ConfigService) {
    this.dataRef = configService.getFirebaseDatabase();
    this.usersRef = configService.getFirebaseDatabase().ref('/users');
    this.collegesRef = this.dataRef.ref('/schools');
  }

  checkUsername(username){
    this.usersRef.once('value',
      (snapshot)=>{
      //TODO: Move to main page logic
        if(snapshot.hasChild(username.toLowerCase())){
          return 'true';
        }else{
          return 'false';
        }
      });
  }

  saveUsername(usernameModel){
    return this.usersRef.child(usernameModel.username).set(usernameModel.name);
  }

  createProfile(user, profileModel){
    let privateProfile = {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      school: profileModel.school,
      userId:user.uid,
      username:null,
      major:null,
      email:null,
      status:null
    };

    let publicProfile = {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      school: profileModel.school,
      major:null,
      status:null
    };
    var profileData = {};
    profileData['/private'] = privateProfile;
    profileData['/public'] = publicProfile;

    return this.usersRef.child('/'+ user.uid).update(profileData);
  }

  editProfile(profileModel){

  }

  getUserProfile(uid){
    return this.usersRef.child('/'+ uid+'/private').once('value');
  }

  checkEmail(){

  }

  lookupColleges(){
    return this.collegesRef.once('value');
  }
}
