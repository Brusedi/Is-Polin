import { Action } from '@ngrx/store';
import { FlightFids } from '@appModels/flight-fids';


export enum flightFidsActionTypes {
    GetFlights = '[Рейс] загрузить',
    GetFlightsSuccess = '[Рейс] Загрузка завершилась удачно',
    ErrorFlights = '[Рейс] Ошибка'
}

export class GetFlights implements Action {
    readonly type = flightFidsActionTypes.GetFlights;
}

export class GetFlightsSuccess implements Action {
    readonly type = flightFidsActionTypes.GetFlightsSuccess;
    constructor(public payload: FlightFids[]) {}
}


export class ErrorFlights implements Action {
    readonly type = flightFidsActionTypes.ErrorFlights;
    constructor(public payload: any) {}
}  

export type flightFidsActions =
  | GetFlights
  | GetFlightsSuccess
  | ErrorFlights
  ;