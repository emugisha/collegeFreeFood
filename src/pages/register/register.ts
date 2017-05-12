import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service";
import {AccountService} from "../../providers/account-service";
import {EditProfilePage} from "../edit-profile/edit-profile";

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private step = 1;
  private registrationModel;
  private schools =[];
  private institutions =[];
  private placeHolderText ="Find Your School";
  private schoolChosen;
  private newUser;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService, private accoutService:AccountService) {
    this.registrationModel = {};

  }
  ionViewDidLoad() {
    this.loadAllSchools();
    this.registrationModel.school = null;
  }

  gotoStep(step){
    this.step = step;
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  getSchools(event:any){
    let searchItem = event.target.value;
    let maxIndex;
    if (searchItem && searchItem.trim() != '') {
        maxIndex = 0;
      this.schools = this.institutions.filter((school) => {
          return maxIndex < 10 && (school.Institution_Name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1 && maxIndex++ < 10) ;
      })

    }
  }
  chooseSchool(school){
    this.registrationModel.schoolName = school.Institution_Name;
    this.registrationModel.schoolId= school.Institution_ID;
    console.log(this.registrationModel);

    this.schoolChosen = true;
    this.schools = [];
  }
  register(){
    this.authService.createAccount(this.registrationModel).then(
      (user)=>{
        this.newUser = user;
        this.createProfile(user);
      },
      (error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
      }
    );
  }

  private createProfile(user){
    this.accoutService.createProfile(user, this.registrationModel).then(
      (success)=>{
        this.navCtrl.push(EditProfilePage);
      },(error)=>{
        console.log('Error');
      }
    )

  }

  private loadAllSchools(){
    this.accoutService.lookupColleges().then((snapshot)=> {
      console.log('Loaded schools.....');
      snapshot.forEach((childSnapshot)=>{
        this.institutions.push(childSnapshot.val());
      });

      console.log(this.institutions);
    })
  }

}
