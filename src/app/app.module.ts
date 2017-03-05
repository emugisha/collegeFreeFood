import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {NewPostPage} from "../pages/new-post/new-post";
import {ExplorePage} from "../pages/explore/explore";
import {CameraService} from "../providers/camera-service";
import {IntroPage} from "../pages/intro-page/intro-page";
import {RegisterPage} from "../pages/register/register";
import {ConfigService} from "../providers/config-service";
import {AccountService} from "../providers/account-service";
import {LoginPage} from "../pages/login/login";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPostPage,
    ExplorePage,
    TabsPage,
    IntroPage,
    RegisterPage,
    LoginPage,
    EditProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPostPage,
    ExplorePage,
    IntroPage,
    TabsPage,
    RegisterPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraService,
    ConfigService,
    AccountService]
})
export class AppModule {}
