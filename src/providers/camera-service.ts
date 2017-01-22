import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Camera} from 'ionic-native';
import {Platform} from "ionic-angular";
/*
  Generated class for the CameraService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraService {

  private cameraOptions;
  constructor(public platform:Platform) {
    this.cameraOptions = {
      quality:70,
      allowEdit:true,
      targetWidth:640,
      targetHeight:640,
      correctOrientation:true
    }
  }

  getImageFromCamera(){
    this.cameraOptions.sourceType = 1;
    return Camera.getPicture(this.cameraOptions);
  }
  getImageFromGallery(){
    this.cameraOptions.sourceType = 0;
    return Camera.getPicture(this.cameraOptions);
  }

}
