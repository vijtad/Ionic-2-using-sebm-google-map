import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { ConnectivityService } from '../providers/connectivity-service';
 
@NgModule({
  declarations: [
  MyApp,
  HomePage,
  ],
  imports: [
  IonicModule.forRoot(MyApp),
  AgmCoreModule.forRoot({ apiKey: 'Your_Api_Key',
    libraries: ['places']})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  ],
  providers: [GoogleMapsAPIWrapper, ConnectivityService]
})
export class AppModule {}