import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {CameraService} from "../../providers/camera-service";
import {DatePicker} from 'ionic-native';
import {PostService} from "../../providers/post-service";
import {HomePage} from "../home/home";
import {AlertService} from "../../providers/alert-service";
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
  private displayImage;
  private newPost;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public cameraService:CameraService,
              private postService:PostService, public alertService:AlertService) {
    this.newPost={}
  }

  ionViewDidLoad() {

  }

  saveNewPost(){
    //TODO:Post an image first and get the URL
    //this.newPost.imageUrl=this.postImage;
    console.log(this.newPost);
    let newPostKey = this.postService.createNewKey();
    this.postService.uploadImage(this.postImage,newPostKey).then(
      data=>{
        console.log('Done creating');
        console.log(data.downloadURL);
        this.newPost.imageUrl = data.downloadURL;
        this.uploadPost(this.newPost,newPostKey);
      },
      error=>this.alertService.showAlert('Error in uploading the image',error,'OK')
    )

  }

  private uploadPost(post, newPostKey){
    this.postService.savePost(post,newPostKey).then(
      success=>{
        this.postImage = null;
        this.newPost = {};
        this.navCtrl.push(HomePage);
      },
      error=>this.alertService.showAlert('Unable to create the new post',error,'OK'));
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
    this.displayImage = "data:image/jpeg;base64,"+imageData;
  }
  private handleCameraError(error){
    console.log('An Error Ocurred');
    console.log(error);
    this.alertService.showAlert('An Error Occurred',error,'OK');
  }
  private showDatePicker(timeFrame){
    DatePicker.show({
      date:new Date(),
      mode:'datetime',
      titleText:'Choose the date and time',
      todayText:'Today',
      nowText:'Now',
      allowOldDates:false

    }).then(
      date=>{
        if(timeFrame == 0){
          this.newPost.startDate = date;
        }else{
          this.newPost.endDate = date;
        }

      },
      error=>this.alertService.showAlert('An Error Occurred',error,'OK')
    );
  }

}
