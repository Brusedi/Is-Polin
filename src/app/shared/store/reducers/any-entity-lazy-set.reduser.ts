import { AnyEntityLazySetAction, AnyEntityLazySetActionTypes }   from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntytyState, anyEntytyinitialState }           from "./any-entity-lazy.reduser";

// 
export interface AnyEntytySetItemState {
    state: AnyEntytyState,
    location: string             // http sublocation
    //checking: boolean ,
    //cheked:false,
    //error: any ;
} 

export interface State {
    [key: string]: AnyEntytySetItemState
}

export const initialState: State = {
    
};

export function reducer(state :State  = initialState, action: AnyEntityLazySetAction): State {
    switch (action.type) {
        case AnyEntityLazySetActionTypes.ADD_ANY_ENTITY:
            return { ...state, [action.payload.name]: { state: anyEntytyinitialState, location: action.payload.location } };    
            
        default:
            return state;
    }
}

 