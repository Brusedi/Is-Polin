import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from "rxjs/operators";

import { flightFidsActionTypes, GetFlightsSuccess, ErrorFlights }   from "@appStore/actions/flight-fids.actions";
import { FlightFidsService }       from "app/shared/services/flight-fids.service";


@Injectable()
export class flightFidsEffects {
  constructor(
      private actions$: Actions, 
      private dataService: FlightFidsService
) {}

  @Effect()   //.insert(action.payload.location, action.payload.data)
    addItem$ = this.actions$.pipe(
        ofType(flightFidsActionTypes.GetFlights),
        switchMap(() =>
          this.dataService.getData()
           .pipe(
             map(x => new GetFlightsSuccess (x)),
             catchError(error => Observable.of(new ErrorFlights(error)))
           )
      )
    );
}