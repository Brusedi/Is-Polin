import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { FlightFids } from '@appModels/flight-fids';

import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/Observable';

import { catchError, map, tap, take } from 'rxjs/operators';

import { DataProvService } from './data-prov.service';
import moment = require('moment/moment');


const LOCATION = '/NvaAx/FlightFids';

const MODULE_NAME    = 'John Galon';
const COMPONENT_NAME = 'DataProvider';

const logErr = (msg:any, oper:any) => ( console.error("["+MODULE_NAME+"]"+"["+COMPONENT_NAME+"] :("+oper+")" + msg )  );

@Injectable()
export class FlightFidsService {

  //const location = 'api/heroes';  // URL to web api

  constructor(
    private dataProv: DataProvService
  ) { }

  private getSubLoc = ()=> "?From="+ moment().add( -3,'days').format("DD-MM-YYYY");

  getData (): Observable<FlightFids[]> {  //FlightFids[]
    return this.dataProv.items(LOCATION,this.getSubLoc() )
      .pipe(
        map(x =><FlightFids[]>x  ),
        //map( x => x.slice(0,20) ),                      //TODO debug
        catchError(this.handleError('getFlights', []))
      );  
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      logErr(error,operation);
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }


}
