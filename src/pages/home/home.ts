import { Component, NgZone } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
declare var window: any;
import {MapsAPILoader} from 'angular2-google-maps/core';
declare var google:any;
import { ConnectivityService } from '../../providers/connectivity-service';
 
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
 
    map: any;
    firstTime : boolean = true;
    isDisplayOfflineMode : boolean = false;
 
    constructor(private navParams: NavParams, private zone: NgZone, private  _loader : MapsAPILoader,
        private connectivityService : ConnectivityService, private alert : AlertController )
    {
        this.map = {
            lat: 0,
            lng: 0,
            zoom: 15
        };
        this.NetworkConnectivity();
 
    }
 
    NetworkConnectivity(){
        setInterval(() => {
            if(this.connectivityService.isOnline()){
 
                if (this.firstTime)
                {
                    this.loadMap();
                    this.autocomplete()
                }
 
            } else {
                if(!this.isDisplayOfflineMode)
                    this.displayOffline();
 
            }
        }, 2000);
 
 
    }
 
    displayOffline() {
        this.isDisplayOfflineMode = true;
        let alert = this.alert.create({
            title: 'Network connectivity',
            subTitle: 'Offline',
            buttons: [{
                text : 'Retry',
                handler: () => {
                    this.isDisplayOfflineMode = false;
                }
            }]
 
        });
        alert.present();
    }


    autocomplete() {
        this._loader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete( document.getElementById('autocomplete').getElementsByTagName('input')[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                let place = autocomplete.getPlace();
                this.map.lat  = place.geometry.location.lat();
                this.map.lng = place.geometry.location.lng();
                console.log(place);
            });
        });
    }
 
 
    loadMap(){
 
        Geolocation.getCurrentPosition().then((position) => {
 
            this.map = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 15
            };
            this.firstTime = false;
        }, (err) => {
        });
 
    }
 
   getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

 
}