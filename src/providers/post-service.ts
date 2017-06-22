import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConfigService} from "./config-service";
import {AuthService} from "./auth-service";
import {NavController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";

/*
  Generated class for the PostService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostService {

  private dataRef;
  private usersRef;
  private postRef;
  private imageRef;
  private currentUserId;

  constructor(public http: Http, public configService:ConfigService, public authService: AuthService) {
    this.dataRef = configService.getFirebaseDatabase();
    this.usersRef = configService.getFirebaseDatabase().ref('/users');
    this.postRef = configService.getFirebaseDatabase().ref('/posts');
    this.authService.getAuth().onAuthStateChanged(
      (user)=>{
        if(user) {
         this.currentUserId = user.uid;
          this.imageRef = configService.getFirebaseStorage().ref('/user-posts/'+this.currentUserId);
        }else{
          this.currentUserId= null;
        }
      });
  }

  createPost(newPost, imageData){

    let newKey = this.postRef.push().key;
    if(imageData) {
      this.uploadImage(imageData, newKey).then(
        (savedPicture) => {
          newPost.imageUrl = savedPicture.downloadUrl;
          return this.savePost(newPost, newKey);
        }, error => {
          console.log('error');
        })
    }else{
      console.log('no image');
      return this.savePost(newPost, newKey);
    }

  }

  public savePost(newPost, newKey){
    newPost.owner = this.currentUserId;
    let updates={};
    updates['/posts/'+newKey]=newPost;
    updates['user-posts/'+this.currentUserId+'/'+newKey]=this.currentUserId;
    updates['timeline/'+this.currentUserId+'/'+newKey]=this.currentUserId;
    console.log('about to update');
    return this.dataRef.ref().update(updates);
  }

  public createNewKey(){
    let newKey = this.postRef.push().key;
    return newKey;
  }
  public uploadImage(imageUrl, newKey){
    return this.imageRef.child('/'+newKey+'.jpg').putString(imageUrl, 'base64', { contentType: 'image/jpg' })
  }

  public getRecentPosts(){
    return this.dataRef.ref('/timeline/').child(this.currentUserId).limitToLast(5).once("value");
  }

  public getPostByKey(key){
    return this.dataRef.ref('/posts/').child(key).once('value');
  }
  public getPostOwner(userId){
    return this.dataRef.ref('/users/').child(userId + '/public').once('value');
  }


}
