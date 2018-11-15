
// import { Injectable } from "@angular/core";
// import { Actions } from "@ngrx/effects";


// @Injectable()
// export class flightFidsEffects {
//   constructor(
//       private actions$: Actions, 
//       //private dataService: FlightFidsService
// ) {}

//   @Effect()   //.insert(action.payload.location, action.payload.data)
//     addItem$ = this.actions$.pipe(
//         ofType(flightFidsActionTypes.GetFlights),
//         switchMap(() =>
//           this.dataService.getData()
          
//            .pipe(
//              map(x => new GetFlightsSuccess (x)),
//              catchError(error => Observable.of(new ErrorFlights(error)))
//            )
//       )
//     );
// }