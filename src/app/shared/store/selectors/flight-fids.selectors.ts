import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromReducers from "@appStore/reducers/flight-fids.reducer";


export const getFlightFidsStore = createFeatureSelector('flightFids');

export const getFlightFidsEntities = createSelector(
    getFlightFidsStore,
    fromReducers.flightFidsEntitySelectors.selectAll
);
  
export const getFlightFids = createSelector(getFlightFidsEntities, entities => {
    return Object.values(entities);
});  