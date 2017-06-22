import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the SportService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SportService {

  private cbbSubscriptionKey;
  private cfbSubscriptionKey;
  private bBallUrl;
  private bBallTeamsUrl;
  private footBallUrl;
  private footBallTeamsUrl;

  constructor(public http: Http) {
    this.cbbSubscriptionKey = "8b354623325f4c9b97b04c399b458c5d";
    this.cfbSubscriptionKey = "a05362f0705740c8b5d00b3b4b93b773"
    this.bBallUrl = "https://api.fantasydata.net/cbb/v2/json/GamesByDate/";
    this.bBallTeamsUrl = "https://api.fantasydata.net/cbb/v2/json/teams";
    this.footBallUrl = "https://api.fantasydata.net/v3/cfb/scores/json/GamesByDate/";
    this.footBallTeamsUrl = "https://api.fantasydata.net/v3/cfb/scores/json/Teams";

  }

  public getCbbGamesByDate(date){
    let apiKey = {"Ocp-Apim-Subscription-Key":this.cbbSubscriptionKey};
    let apiHeader ={headers:new Headers(apiKey)};
    let cbbGamesRequest = this.http.get(this.bBallUrl+date,apiHeader).map((response:Response)=>response.json());
    let cbbTeamsRequest = this.http.get(this.bBallTeamsUrl,apiHeader).map((response:Response)=>response.json());

    return Observable.forkJoin(cbbGamesRequest,cbbTeamsRequest);
  }
  public getCfbGamesByDate(date){
    let apiKey = {"Ocp-Apim-Subscription-Key":this.cfbSubscriptionKey};
    let apiHeader ={headers:new Headers(apiKey)};
    let cfbGamesRequest = this.http.get(this.footBallUrl+date,apiHeader).map((response:Response)=>response.json());
    let cfbTeamsRequest = this.http.get(this.footBallTeamsUrl,apiHeader).map((response:Response)=>response.json());
    return Observable.forkJoin(cfbGamesRequest,cfbTeamsRequest);
  }

}
