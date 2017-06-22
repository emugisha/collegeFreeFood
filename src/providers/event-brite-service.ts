import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventBriteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventBriteService {

  private eventBriteUrl;
  private token;
  constructor(public http: Http) {
    this.eventBriteUrl = "https://www.eventbriteapi.com/v3/events/search/?";
    this.token = "P6UVUQIHXR5DLMMHGNTG";
  }

  public getEventsByLocation(lat,longtd){
    let eventUrl = this.eventBriteUrl+'token='+this.token+'&location.within=10mi'+'&location.latitude='+lat+"&location.longitude="+longtd+"&q=food&q=sports&q=college&q=party&q=drinks"+"&sort_by=date";
    return this.http.get(eventUrl).map((response:Response)=>response.json())
  }

}
