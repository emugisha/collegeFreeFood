import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {CameraService} from "../../providers/camera-service";
import {AccountService} from "../../providers/account-service";
import {AuthService} from "../../providers/auth-service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import {HomePage} from "../home/home";
import {AlertService} from "../../providers/alert-service";
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  private profilePicture;
  private profileModel;
  private user;
  private editProfileForm: FormGroup;
  private isUsernameTaken = false;
  private validationPending = false;
  private hasProfilePictureChanged:boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private cameraService:CameraService,
              private accountService: AccountService, private authService: AuthService, private formBuilder: FormBuilder,
              private alertService:AlertService) {
    this.profileModel = {};

  }

  /*ionViewCanEnter():boolean{
    let auth = this.configService.getFirebaseAuth();

    auth.onAuthStateChanged((user)=>{
      if(user){
        return true;
      }else{
        return false;
      }
    });

}*/
  ionViewDidLoad() {

    this.authService.getAuth().onAuthStateChanged(
      (user)=>{
        if(user) {
          this.user = user;
          this.profilePicture = "../assets/intro/dummy.png";
            this.accountService.getUserProfile(user.uid).then((snapshot)=>{
              let profileModel = snapshot.val();
              this.buildEditProfileForm(profileModel);
            });

        }else{
          console.log('Not logged in');
        }
      },
      (error)=>{
        console.log('error occurred');
        console.log(error);
      }
    );

  }

  showPictureOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title:'Change Profile Picture',
      buttons: [
        {
          text: 'Remove Current Picture',
          role:'destructive',
          handler:()=>{
            this.profilePicture ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
          }
        },
        {
          text: 'Take Photo',
          handler:()=>{
            this.cameraService.getImageFromCamera()
              .then((imageData) => this.extractPicture(imageData),
                (error) => this.handleCameraError(error));
          }
        },
        {
          text:"Choose from Gallery",
          handler:()=>{
            this.cameraService.getImageFromGallery()
              .then((imageData) => this.extractPicture(imageData),
                (error) => this.handleCameraError(error));
          }
        },
        {
          text:'Cancel',
          role:'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private extractPicture(imageData){
    this.profilePicture = imageData;
    this.hasProfilePictureChanged = true;

  }
  private handleCameraError(error){
    console.log('An Error Ocurred');
    console.log(error);
  }

  private changeProfile(){
    this.profileModel = this.editProfileForm.value;

    if(this.hasProfilePictureChanged){
      this.accountService.uploadProfilePicture(this.profilePicture).then((data)=>{
        this.profileModel.profilePictureUrl = data.downloadURL;
        this.updateProfile();

      },(error)=>this.alertService.showAlert('Aw, Snap!',"Unable to upload the profile picture. Please try again",'OK'))
    }else{
      this.updateProfile();
    }

  }

  private updateProfile(){
    this.accountService.updateProfile(this.profileModel, this.user).then(
      (success)=>{
        this.navCtrl.push(HomePage);
      },(error)=>{
        console.log('Error');
      }
    );
  }

  private buildEditProfileForm(profileModel){
    this.editProfileForm= this.formBuilder.group({
      username: [profileModel.username, [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      name: [profileModel.firstName +' '+ profileModel.lastName, [Validators.required, Validators.maxLength(40)]],
      email: [profileModel.email],
      status: [profileModel.status, [Validators.maxLength(50)]],
      schoolName: [profileModel.schoolName],
      schoolId: [profileModel.schoolId],
      phone: [profileModel.phone],
      generalNotifications: [profileModel.generalNotifications] || true,
      cliqueNotifications: [profileModel.cliqueNotifications] || true
    });

    this.editProfileForm.controls['username'].valueChanges
      .debounceTime(500)
      .subscribe(username=>{
      this.validateUsername(username);
    })
  }

  private validateUsername(username) {
    this.validationPending = true;
    this.isUsernameTaken= false;
    this.accountService.checkUsername(username).then((snapshot)=>{

      if(snapshot.val()){
        console.log('found');
        console.log(snapshot.val());
        this.isUsernameTaken = true;
        this.validationPending = false;
      }else {
        this.isUsernameTaken = false;
        this.validationPending = false;
        console.log('Not found');
      }
    });

  }

}
