import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {MenuPage} from "../menu/menu";
import {PostService} from "../../providers/post-service";
import {AccountService} from "../../providers/account-service";
import {PresentationPage} from "../presentation/presentation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private timeline = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthService, public postService:PostService,
              public accountService:AccountService) {

  }

  ionViewDidLoad(){
    this.authService.getAuth().onAuthStateChanged(
      (user)=>{
        if(user) {
          console.log(user);
          //Retrieve recent posts
          this.getRecentPosts(user.uid);
          } else{
          //this.navCtrl.push(LoginPage);
          this.navCtrl.push(PresentationPage);
        }
      },
      (error)=>{
        console.log('error occurred');
        console.log(error);
      }
    );
}

getRecentPosts(userId){
   this.postService.getRecentPosts().then(
     (data)=>{
       data.forEach((snapshot)=>{
         this.getPostDetails(snapshot.key);
       });
   },
   error=>{
     console.log(error);
   });
}

private getPostDetails(key){
  this.postService.getPostByKey(key).then((data)=>{

    let post = data.val();
    if(post.owner){
      this.postService.getPostOwner(post.owner).then((data)=> {
          post.ownerProfile = data.val();
          this.timeline.push(post);
        }
      );
    }else{
      console.log(this.accountService.getCurrentUser());
      post.ownerProfile = this.accountService.getCurrentUser();
      this.timeline.push(post);
    }
  })
}

goToMenu(){
  this.navCtrl.push(MenuPage);
}

}
