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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPostPage,
    ExplorePage,
    TabsPage,
    IntroPage,
    RegisterPage
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
    RegisterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, CameraService]
})
export class AppModule {}
