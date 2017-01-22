import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {CameraService} from "../../providers/camera-service";
import {DatePicker} from 'ionic-native';
/*
  Generated class for the NewPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {

  private postImage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public cameraService:CameraService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  showActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title:'Choose From',
      buttons: [
        {
          text: 'Camera',
          handler:()=>{
              this.cameraService.getImageFromCamera()
                .then((imageData) => this.extractPicture(imageData),
                  (error) => this.handleCameraError(error));
          }
        },
        {
          text:"Gallery",
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
    this.postImage = imageData;
  }
  private handleCameraError(error){
    console.log('An Error Ocurred');
    console.log(error);
  }
  showDatePicker(){
    DatePicker.show({
      date:new Date(),
      mode:'datetime',
      titleText:'Choose the date and time',
      todayText:'Today',
      nowText:'Now',
      allowOldDates:false

    }).then(
      date=>console.log('On '+date),
      error=>console.log('Error occured while getting date: ', error)
    );
  }

}
