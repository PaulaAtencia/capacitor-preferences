import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './core/interfaces/data-service';
import { DataInMemoryService } from './core/services/data-in-memory.service';
import { FirebaseDataService } from './core/services/Firebase.service';
import { CookiesDataService } from './core/services/cookies.service';

export function DataServiceFactory(backend:string){
    switch(backend){
      case 'InMemory':
        return new DataInMemoryService();
      case 'Firebase':
        return new FirebaseDataService();
      case 'Cookies':
        return new CookiesDataService();
      default:
        throw new Error("Not implemented");
    }
} 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'backend',
      useValue:'Cookies'
    },
    {
      provide: DataService,
      deps: ['backend'],
      useFactory: DataServiceFactory,  
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
