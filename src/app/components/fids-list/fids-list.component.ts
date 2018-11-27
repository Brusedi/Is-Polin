import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';

import  *  as fromStore   from '@appStore/index';


import * as fromSelectors from '@appStore/selectors/index';
import { GetFlights } from '@appStore/actions/flight-fids.actions';
import { AddItem, ExecItemAction, Exec } from '@appStore/actions/any-entity-lazy-set.actions';

import { FlightFids }           from '@appModels/flight-fids';
import { CompanyImagesOption }  from '@appModels/any-entity';
import { GetItem } from '@appStore/actions/any-entity-lazy.actions';
import moment = require('moment');
import { map } from 'rxjs/operators';

//import { GetItem } from '@appStore/actions/any-entity-lazy.actions';
//import { CompanyImages } from '@appModels/any-entity-references';



@Component({
  selector: 'app-fids-list',
  templateUrl: './fids-list.component.html',
  styleUrls: ['./fids-list.component.css']
})
export class FidsListComponent implements OnInit {

  flights$: Observable<FlightFids[]>;

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {

    this.store.dispatch( new GetFlights() )  
    this.store.dispatch( new AddItem( CompanyImagesOption) );

    this.store.select( fromSelectors.selectItemWasSearhing("CompanyImages", "СУ" ) )
    .subscribe( x=> console.log(x) );

    // this.store.dispatch(  new Exec(  { name: "CompanyImages" , itemAction: new GetItem( 'СУ' ) }  ));
    // this.store.dispatch(  new Exec(  { name: "CompanyImages" , itemAction: new GetItem( 'СУК' ) }  ));
    // this.store.dispatch(  new Exec(  { name: "CompanyImages" , itemAction: new GetItem( 'СУ' ) }  ));

    // this.store.dispatch( new AddItem( { 
    //   name: "CompanyImages", 
    //   location:"/NvaAx/NVAOMACUSTLOGO", 
    //   selectId: ((x:CompanyImages) => x.custaccount ),
    //   selBack: (x:string) => ("?CUSTACCOUNT=" + x )
    //  }  ) )

    // this.store.dispatch( 
    //   new ExecItemAction( 
    //     {  itemOption: { 
    //       name: "CompanyImages", 
    //       location:"/NvaAx/NVAOMACUSTLOGO", 
    //       selectId: ((x:CompanyImages) => x.custaccount ),
    //       selBack: (x:string) => ("?CUSTACCOUNT=" + x )
    //      }, itemAction: new GetItem( 'ЛА' ) }  
    // ) );


    // this.store.dispatch( 
    //   new Exec(  { name: "CompanyImages" , itemAction: new GetItem( 'СУ' ) }  
    // ));

    //  this.store.dispatch( 
    //    new Exec( 
    //      {  name: "CompanyImages", itemAction: new GetItem( 'СУ2' ) }  
    //  ) );

    
    
    // this.store.dispatch( 
    //   new ExecItemAction( 
    //     {  name: "CompanyImages", itemAction: new GetItem( 'ЛА3' ) }  
    // ) );

    // this.store.dispatch( 
    //   new ExecItemAction( 
    //     {  name: "CompanyImages", itemAction: new GetItem( 'ЛА3e' ) }  
    // ) );

    //  this.store.dispatch( new AddItem({ 
    //    name: "NvaSdEventType", 
    //    location:"/NvaAx/NvaSdEventType", 
    //    selectId: ((x:{id:string}) => x.id ),
    //    selBack: (x:string) => ("?ID=" + x )
    //   }  ) )
    
    //  this.store.dispatch( 
    //   new ExecItemAction( 
    //     {  name: "NvaSdEventType", itemAction: new GetItem( 'ЛА3e' ) }  
    //   ) );

    //   this.store.dispatch( 
    //     new ExecItemAction( 
    //       {  name: "NvaSdEventType", itemAction: new GetItem( 'ChangeRequest' ) }  
    //   ) );

    //   this.store.dispatch( 
    //     new ExecItemAction( 
    //       {  name: "NvaSdEventType", itemAction: new GetItem( 'SafetyInformationСA' ) }  
    //   ) );


    //   this.store.dispatch( 
    //     new ExecItemAction( 
    //       {  name: "NvaSdEventType", itemAction: new GetItem( 'ЛА3e' ) }  
    //     ) );
  
    //this.store.pipe(select(fromSelectors.getFlightFids)).subscribe(x=> console.log(x));    

    // this.store.select( x=> x)
    //    .subscribe(x=> console.log(x));

    this.flights$ = this.store.pipe(
        select(fromSelectors.getFlightFids),
        map( (x:FlightFids[])=> x.sort( (n1,n2) => (new Date(n2.transDate).getTime() - new Date(n1.transDate).getTime())   )  )

    ); 
    
    this.store.select( fromSelectors.selectReferenceItemNotFound("CompanyImages", "СУ" ) )
       .subscribe( x=> console.log(x) );
    

       
    //this.flights$.subscribe(x=> console.log(x));

  }

}
