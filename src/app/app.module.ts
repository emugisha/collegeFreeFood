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
import {AuthService} from "../providers/auth-service";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {MenuPage} from "../pages/menu/menu";
import {NotificationPage} from "../pages/notification/notification";
import {SquadPage} from "../pages/squad/squad";
import {NewSquadPage} from "../pages/new-squad/new-squad";
import {SquadDetailsPage} from "../pages/squad-details/squad-details";
import {AlertService} from "../providers/alert-service";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {PostService} from "../providers/post-service";
import {GrouponService} from "../providers/groupon-service";
import {Geolocation} from "ionic-native";
import {SportService} from "../providers/sport-service";
import {EventBriteService} from "../providers/event-brite-service";
import {PresentationPage} from "../pages/presentation/presentation";

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
    EditProfilePage,
    MenuPage,
    NotificationPage,
    SquadPage,
    NewSquadPage,
    SquadDetailsPage,
    ResetPasswordPage,
    PresentationPage
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
    LoginPage,
    EditProfilePage,
    MenuPage,
    NotificationPage,
    SquadPage,
    NewSquadPage,
    SquadDetailsPage,
    ResetPasswordPage,
    PresentationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraService,
    ConfigService,
    AccountService,
    AuthService,
    AlertService,
    PostService,
    GrouponService,
    SportService,
    Geolocation,
    EventBriteService]
})
export class AppModule {}
