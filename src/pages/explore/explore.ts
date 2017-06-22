import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {GrouponService} from "../../providers/groupon-service";
import {AlertService} from "../../providers/alert-service";
import {SportService} from "../../providers/sport-service";
import {EventBriteService} from "../../providers/event-brite-service";

/*
  Generated class for the Explore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  private segment = 'food';
  private grouponDeals;
  private menBbGames = [];
  private womenBbGames= [];
  private ncaaFootballGames=[];
  private location;
  private events = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private grouponService:GrouponService,
              private alertService:AlertService, private loadingCtrl: LoadingController, private sportService:SportService,
              private eventBriteService:EventBriteService) {
    this.location = {};
    this.grouponDeals = [];
  }

  ionViewDidLoad() {

    this.grouponService.getCurrentLocation().then(
      (data)=>{
        this.location.lat = data.coords.latitude;
        this.location.longitude = data.coords.longitude;
        this.displayGrouponDetails();
        this.displayEvents();
      },error=>{
        this.alertService.showAlert('Oops','Unable to get your Current Location.Please Enable Location Services and try again','OK');
      });

    this.getCbbGames();
    this.getCfbGames();
  }
  onSegmentChange(event){
      if(this.segment = 'food' ){
        this.displayGrouponDetails();
      }else if(this.segment ='sports'){
        this.getCbbGames();
      }
  }

  private getCbbGames(){
    let date = new Date('2017-FEB-27').toISOString().slice(0,10);
    this.sportService.getCbbGamesByDate(date).subscribe(
      (data)=>{
        let cbbGames = data[0];
        let cbbTeams = data[1];

        //Process basketball teams
        for(let i=0; i<cbbGames.length;i++){
          let awayTeam = cbbTeams.find(team => team.Key == cbbGames[i].AwayTeam);
          let homeTeam = cbbTeams.find(team=>team.Key == cbbGames[i].HomeTeam);
          cbbGames[i].HomeTeam = homeTeam ? homeTeam.School : cbbGames[i].HomeTeam;
          cbbGames[i].AwayTeam = awayTeam ? awayTeam.School : cbbGames[i].AwayTeam;
          this.menBbGames.push(cbbGames[i]);
        }

      },
      error=>this.alertService.showAlert('Oops','Sports data is unavailable at the moment. Please try again later','OK')
    )
  }

  private getCfbGames(){
    let date = new Date('2017-AUG-26').toISOString().slice(0,10);
    this.sportService.getCfbGamesByDate(date).subscribe(
      (data)=>{
        let cfbGames = data[0];
        let cfbTeams = data[1];

        //Process football teams
        for(let i=0; i<cfbGames.length;i++){
          let awayTeam = cfbTeams.find(team => team.Key == cfbGames[i].AwayTeam);
          let homeTeam = cfbTeams.find(team=>team.Key == cfbGames[i].HomeTeam);
          cfbGames[i].HomeTeam = homeTeam ? homeTeam.School : cfbGames[i].HomeTeam;
          cfbGames[i].AwayTeam = awayTeam ? awayTeam.School : cfbGames[i].AwayTeam;
          this.ncaaFootballGames.push(cfbGames[i]);
        }
      },
      error=>this.alertService.showAlert('Oops','Sports data is unavailable at the moment. Please try again later','OK')
    )
  }

  private displayGrouponDetails(){
    let loading = this.loadingCtrl.create({
      content: 'Fetching them deals...'
    });
    loading.present();
    this.grouponService.getGrouponDeals(this.location.lat,this.location.longitude).subscribe(
      (data:any)=>{
        loading.dismiss();
       this.grouponDeals = data.deals;
      },error=>{
        loading.dismiss();
        this.alertService.showAlert('Oops','Local deals are currently unavailable.Please try again later','OK');
      }
    )
  }
  viewMoreDealDetails(url){

  }
  private displayEvents(){
    this.eventBriteService.getEventsByLocation(this.location.lat,this.location.longitude).subscribe(
      (data)=>{
        this.events = data ? data.events:[];
      },(error)=>{

      }
    )
  }

}
