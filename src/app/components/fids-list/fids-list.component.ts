import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';

import  *  as fromStore   from '@appStore/index';
import { FlightFids } from '@appModels/flight-fids';

import * as fromSelectors from '@appStore/selectors/flight-fids.selectors';
import { GetFlights } from '@appStore/actions/flight-fids.actions';
import { AddItem, ExecItemAction } from '@appStore/actions/any-entity-lazy-set.actions';
import { GetItem } from '@appStore/actions/any-entity-lazy.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { custImages } from '@appModels/any-entity';

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
    
    this.store.dispatch( new AddItem({ 
      name: "CompanyImages", 
      location:"/NvaAx/NVAOMACUSTLOGO", 
      adapter: createEntityAdapter<custImages>(   { selectId: (x => x.custaccount ) }  
               
        ) }  ) )

    this.store.dispatch( 
      new ExecItemAction( 
        {  name: "CompanyImages", itemAction: new GetItem( 'ЛА' ) }  
    ) );

    this.store.dispatch( 
      new ExecItemAction( 
        {  name: "CompanyImages", itemAction: new GetItem( 'СУ' ) }  
    ) );

    this.store.dispatch( 
      new ExecItemAction( 
        {  name: "CompanyImages", itemAction: new GetItem( 'ЛА3' ) }  
    ) );

    this.store.dispatch( 
      new ExecItemAction( 
        {  name: "CompanyImages", itemAction: new GetItem( 'ЛА3e' ) }  
    ) );

    //this.store.pipe(select(fromSelectors..getFlightFids));    

    // this.store.select( x=> x)
    //   .subscribe(x=> console.log(x));

    this.flights$ = this.store.pipe(select(fromSelectors.getFlightFids));    
    //this.flights$.subscribe(x=> console.log(x));

  }

}
