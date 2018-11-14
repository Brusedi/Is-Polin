import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { FidsListComponent }    from './components/fids-list/fids-list.component';
import { IspolinHpComponent }   from './components/ispolin-hp/ispolin-hp.component';
import { StoreModule }          from '@ngrx/store';

import * as fromStore from '@appStore/index';
import { EffectsModule } from '@ngrx/effects';

import { AppSettingsService } from './shared/services/app-setting.service';
import { DataProvService } from './shared/services/data-prov.service';
import { FlightFidsService } from './shared/services/flight-fids.service';
import { HttpModule } from '@angular/http';
import { FidsItemBaseComponent } from './components/fids-item-base/fids-item-base.component';
import { FlightFids2FlightPipe } from './pipes/flight-fids-2-flight.pipe';


const appRoutes: Routes = [
  { path: ''        , component: IspolinHpComponent, pathMatch: 'full' },
  { path: 'flight'  , component: FidsListComponent }//,  
  //{ path: '**'    , component: JnNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FidsListComponent,
    IspolinHpComponent,
    FidsItemBaseComponent,
    FlightFids2FlightPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(
       appRoutes,
       { enableTracing: false } // <-- debugging purposes only
     ),
     StoreModule.forRoot( fromStore.reducers ),
     EffectsModule.forRoot( fromStore.effects)  
  ],
  providers: [
    AppSettingsService,
    DataProvService,
    FlightFidsService
    
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
