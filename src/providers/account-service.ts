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
  private currentUser;

  constructor(public http: Http, configService:ConfigService) {
    this.dataRef = configService.getFirebaseDatabase();
    this.usersRef = configService.getFirebaseDatabase().ref('/users');
    this.usernamesRef = configService.getFirebaseDatabase().ref('/registered');
    this.collegesRef = this.dataRef.ref('/schools');
    this.currentUser = {};
  }

  checkUsername(username:string){
    console.log('Checking username');
    return this.usernamesRef.orderByValue().equalTo(username.toLowerCase()).once("value");
  }

  saveUsername(usernameModel){
    return this.usersRef.child(usernameModel.username).set(usernameModel.name);
  }

  createProfile(user, profileModel){
    let privateProfile = this.getPrivateProfile(profileModel,user);

    let publicProfile =  this.getPublicProfile(profileModel);
    var profileData = {};
    profileData['/users/'+user.uid+'/private'] = privateProfile;
    profileData['/users/'+user.uid+'/public'] = publicProfile;
    profileData['/attendance/' +privateProfile.schoolId + '/'+user.uid] = true;

    //return this.usersRef.child('/'++'/'+ user.uid).update(profileData);
    return this.dataRef.ref('/').update(profileData);
  }

  updateProfile(profileModel, user){
    let privateProfile = this.getPrivateProfile(profileModel,user);
    let publicProfile =  this.getPublicProfile(profileModel);
    var profileData = {};
    profileData['/users/'+user.uid+'/private'] = privateProfile;
    profileData['/users/'+user.uid+'/public'] = publicProfile;
    profileData['/registered/'+user.uid] = profileModel.username;

    return this.dataRef.ref().update(profileData);
  }

  getUserProfile(uid){
    return this.usersRef.child(uid+'/private').once('value');
  }

  checkEmail(){

  }

  lookupColleges(){
    return this.collegesRef.once('value');
  }

  private getPrivateProfile(profileModel, user){
    return {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      schoolName: profileModel.school,
      schoolId:profileModel.schoolId,
      userId:user.uid,
      username:profileModel.username,
      major:profileModel.major,
      email:profileModel.email,
      status:profileModel.status
    };

}
  private getPublicProfile(profileModel){
    return {
      firstName:profileModel.firstName,
      lastName:profileModel.lastName,
      schoolName: profileModel.school,
      username:profileModel.username,
      major:profileModel.major,
      status:profileModel.status
    };
  }

  public getCurrentUser(){
    return this.currentUser;
  }

  public setCurrentUser(auth){
    auth.onAuthStateChanged(
      (user)=>{
        if(user) {
           this.usersRef.child(user.uid+'/public').once('value').then(
             (currentUser)=>this.currentUser = currentUser.val()
           );
        } else{
          this.currentUser = null;
        }
      },
      (error)=>{
        this.currentUser = null;
      }
    );
  }
}
