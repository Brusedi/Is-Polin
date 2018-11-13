import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { FidsListComponent }    from './components/fids-list/fids-list.component';
import { IspolinHpComponent }   from './components/ispolin-hp/ispolin-hp.component';


const appRoutes: Routes = [
  { path: ''        , component: IspolinHpComponent, pathMatch: 'full' },
  { path: 'flight'  , component: FidsListComponent }//,  
  //{ path: '**'    , component: JnNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FidsListComponent,
    IspolinHpComponent
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(
       appRoutes,
       { enableTracing: false } // <-- debugging purposes only
     )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
