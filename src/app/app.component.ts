import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {ConfigService} from '../providers/config-service'
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro-page/intro-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = IntroPage;

  constructor(platform: Platform, configService: ConfigService) {
    configService.initializeFirebase();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
