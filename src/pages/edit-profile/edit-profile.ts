import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {CameraService} from "../../providers/camera-service";
import {AccountService} from "../../providers/account-service";

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
  private profileModel = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public cameraService:CameraService,
              public accountService: AccountService) {}

  ionViewDidLoad() {
    this.profilePicture ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
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
  }
  private handleCameraError(error){
    console.log('An Error Ocurred');
    console.log(error);
  }

  private changeProfile(){
    this.accountService.editProfile(this.profileModel);
  }

}
