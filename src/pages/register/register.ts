import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service";
import {AccountService} from "../../providers/account-service";

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
  private registrationModel = {school:''};
  private schools =[];
  private institutions =[];
  private placeHolderText ="Find Your College";
  private schoolChosen;
  private newUser;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService, private accoutService:AccountService) {}

  ionViewDidLoad() {
    this.institutions.push('University of Arkansas');
    this.institutions.push('Massachusset Institute of Technology');
    this.institutions.push('University of Maryland');
    this.institutions.push('Howard University');
    this.institutions.push('Howard Community College');
  }

  gotoStep(step){
    this.step = step;
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  getSchools(event:any){
    let searchItem = event.target.value;
    if (searchItem && searchItem.trim() != '') {
      this.schools = this.institutions.filter((school) => {
        return (school.toLowerCase().indexOf(searchItem.toLowerCase()) > -1);
      })
    }
  }
  chooseSchool(school){
    this.registrationModel.school = school;
    this.schoolChosen = true;
    this.schools = [];
  }
  register(){
    this.authService.createAccount(this.registrationModel).then(
      (user)=>{
        console.log(user);
        this.newUser = user;
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

  private createProfile(registrationModel){
    let profile = {
      firstName:registrationModel.firstName,
      lastName:registrationModel.lastName,
      school: registrationModel.school
    }
  }

}
