import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {NewPostPage} from "../pages/new-post/new-post";
import {ExplorePage} from "../pages/explore/explore";
import {CameraService} from "../providers/camera-service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPostPage,
    ExplorePage,
    TabsPage
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
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, CameraService]
})
export class AppModule {}
