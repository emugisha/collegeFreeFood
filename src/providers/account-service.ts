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
  private usernamesRef;
  private profile;

  constructor(public http: Http, configService:ConfigService) {
    this.dataRef = configService.getFirebaseDatabase();
    this.usersRef = configService.getFirebaseDatabase().ref('/users');
    this.usernamesRef = configService.getFirebaseDatabase().ref('/usernames');
    this.collegesRef = this.dataRef.ref('/schools');
  }

  checkUsername(){
    return this.usernamesRef.once('value');
  }

  saveUsername(usernameModel){
    return this.usersRef.child(usernameModel.username).set(usernameModel.name);
  }

  createProfile(user, profileModel){
    let privateProfile = {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      schoolName: profileModel.school,
      schoolId:profileModel.schoolId,
      userId:user.uid,
      username:null,
      major:null,
      email:profileModel.email,
      status:null
    };

    let publicProfile = {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      schoolName: profileModel.school,
      major:null,
      status:null
    };



    var profileData = {};
    profileData['/users/'+user.uid+'/private'] = privateProfile;
    profileData['/users/'+user.uid+'/public'] = publicProfile;
    profileData['/attendance/' +privateProfile.schoolId + '/'+user.uid] = {};

    //return this.usersRef.child('/'++'/'+ user.uid).update(profileData);
    return this.dataRef.ref('/').update(profileData);
  }

  editProfile(profileModel){

  }

  getUserProfile(uid){
    return this.usersRef.child(uid+'/private').once('value');
  }

  checkEmail(){

  }

  lookupColleges(){
    return this.collegesRef.once('value');
  }
}
