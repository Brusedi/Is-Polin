import { ActionReducerMap } from '@ngrx/store';

import * as fromReducers from './reducers';
import { flightFidsEffects } from './effects/flight-fids.effects';

export interface State {
    //routerReducer: fromRouter.RouterReducerState;
    flightFids:fromReducers.flightFids.State;
}
  
export const reducers: ActionReducerMap<State> = {
    flightFids:fromReducers.flightFids.reducer
};
  
//export const effects = [JnEffects];

export const effects = [flightFidsEffects];