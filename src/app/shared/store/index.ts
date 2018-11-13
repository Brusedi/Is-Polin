import { ActionReducerMap } from '@ngrx/store';

import * as fromReducers from './reducers';


export interface State {
    //routerReducer: fromRouter.RouterReducerState;
    flightFids:fromReducers.flightFids.State;
}
  
export const reducers: ActionReducerMap<State> = {
    flightFids:fromReducers.flightFids.reducer
};
  
//export const effects = [JnEffects];
