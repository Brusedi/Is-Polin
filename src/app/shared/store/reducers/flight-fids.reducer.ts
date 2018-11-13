import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { FlightFids } from "@appModels/flight-fids";
import { flightFidsActions, flightFidsActionTypes } from '@appStore/actions/flight-fids.actions';


export interface State extends EntityState<FlightFids> {
    loaded: boolean;
    loading: boolean;
    error: any;
    selectedId: number;
}

export const adapter: EntityAdapter<FlightFids> = createEntityAdapter<FlightFids>();

export const initialState: State = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    selectedId: null
  });

export function reducer(state = initialState, action: flightFidsActions): State {
    switch (action.type) {
        case flightFidsActionTypes.GetFlights:
            return { ...state, loading: true };    
            
        case flightFidsActionTypes.GetFlightsSuccess:
            return adapter.addAll(
                action.payload,
                { ...state , loaded: false, loading: true }
            );  
        
        case flightFidsActionTypes.ErrorFlights:
            return { ...state, loaded: false, loading: false, error:  action.payload};            
            
        default:
            return state;
    }
}

 export const flightFidsEntitySelectors = adapter.getSelectors();