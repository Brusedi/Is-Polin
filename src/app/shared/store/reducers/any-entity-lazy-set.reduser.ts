import { EntityAdapter } from "@ngrx/entity";

import { AnyEntityLazySetAction, AnyEntityLazySetActionTypes, ExecItemAction }   from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntytyState, anyEntytyinitialState, initStateFromAdapter }  from "./any-entity-lazy.reduser";
import * as fromEntityReduser from "./any-entity-lazy.reduser"
import { anyEntityLazyActions } from "@appStore/actions/any-entity-lazy.actions";



// 
export interface AnyEntytySetItemState<T> {
    state:    AnyEntytyState<T>,
    location: string             // http sublocation  key 
    adapter : EntityAdapter<T> 
    action? : anyEntityLazyActions 
    //checking: boolean ,
    //cheked:false,
    //error: any ;
} 

// key as location
export interface State {
    [key: string]: AnyEntytySetItemState<any>
    error: any;
}

export const initialState: State = {
    error:null
};

export function reducer(state :State  = initialState, action: AnyEntityLazySetAction): State {
    //console.log( action) ;
    switch (action.type) {

        case AnyEntityLazySetActionTypes.ADD_ANY_ENTITY_LAZY:
            return { ...state, [action.payload.name]: { 
                                    state:      initStateFromAdapter( action.payload.adapter),
                                    location:   action.payload.location,
                                    action:     null ,
                                    adapter:    action.payload.adapter
                                } };    

        case AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION: {
            console.log(action.payload);
            console.log(state);
            var s = { ...state, 
                        [action.payload.name]:{ 
                            ...state[action.payload.name],
                            action: (<ExecItemAction>action).payload.itemAction,
                            state: fromEntityReduser.reducerFromAdapter(
                                state[action.payload.name].adapter
                             ) (  state[action.payload.name].state, (<ExecItemAction>action).payload.itemAction )     
                            //state: fromEntityReduser.reducer( state[action.payload.name].state, (<ExecItemAction>action).payload.itemAction ) 
                    }};
            console.log(s);        
            return s;        
        };    
        
        case AnyEntityLazySetActionTypes.COMPLETE_ANY_ENTITY_LAZY_ACTION: {
            return { ...state, 
                [action.payload.name]:{ 
                    ...state[action.payload.name],
                    action: null
            }};
        };    

        case AnyEntityLazySetActionTypes.EROR_ANY_ENTITY_SET:{        
                //console.log(action);
                return { ...state, error:action.payload };    
            }    

        default:
            return state;
    }
}

 