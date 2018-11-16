import { ActionReducerMap } from '@ngrx/store';

import * as fromReducers from './reducers';

import { flightFidsEffects }        from './effects/flight-fids.effects';
import { anyEntytySetEffects }      from './effects/any-entity-lazy-set.effects';


export interface State {
    //routerReducer: fromRouter.RouterReducerState;
    flightFids:fromReducers.flightFids.State;
    references:fromReducers.anyEntityLazySet.State; 
}
  
export const reducers: ActionReducerMap<State> = {
    flightFids:fromReducers.flightFids.reducer ,
    references:fromReducers.anyEntityLazySet.reducer 
};
  
//export const effects = [JnEffects];

export const effects = [flightFidsEffects, anyEntytySetEffects];