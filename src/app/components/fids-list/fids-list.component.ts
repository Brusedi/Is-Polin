import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';

import  *  as fromStore   from '@appStore/index';
import { FlightFids } from '@appModels/flight-fids';

import * as fromSelectors from '@appStore/selectors/flight-fids.selectors';
import { GetFlights } from '@appStore/actions/flight-fids.actions';
import { AddAnyItem } from '@appStore/actions/any-entity-lazy-set.actions';

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
    
    this.store.dispatch( new AddAnyItem({ name: "CompanyImages", location:"'/NvaAx/FlightFids'"}  ) )

    //this.store.value.


    this.flights$ = this.store.pipe(select(fromSelectors.getFlightFids));    
    this.flights$.subscribe(x=> console.log(x));



  }

}
