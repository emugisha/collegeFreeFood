import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from "ionic-native";


/*
  Generated class for the GrouponService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GrouponService {

  private grouponUrl = "https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_201236_212556_0";

  constructor(public http: Http) {
  }

  public getCurrentLocation(){
    return Geolocation.getCurrentPosition();
  }

  public getGrouponDeals(lat, long){
    let url =this.grouponUrl + '&lat='+ lat +'&lng='+ long+'&filters=category:food-and-drink&offset=0&limit=20';
   return this.http.get(url).map((response:Response)=>response.json());
  }
}
