import { AnyEntityLazySetAction, AnyEntityLazySetActionTypes, ExecItemAction }   from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntytyState, anyEntytyinitialState }  from "./any-entity-lazy.reduser";
import * as fromEntityReduser from "./any-entity-lazy.reduser"
import { anyEntityLazyActions } from "@appStore/actions/any-entity-lazy.actions";



// 
export interface AnyEntytySetItemState {
    state: AnyEntytyState,
    location: string             // http sublocation

    action? : anyEntityLazyActions   
    //checking: boolean ,
    //cheked:false,
    //error: any ;
} 

export interface State {
    [key: string]: AnyEntytySetItemState
    error: any;
}

export const initialState: State = {
    error:null
};

export function reducer(state :State  = initialState, action: AnyEntityLazySetAction): State {

    switch (action.type) {
        case AnyEntityLazySetActionTypes.ADD_ANY_ENTITY_LAZY:
            return { ...state, [action.payload.name]: { state: anyEntytyinitialState, location: action.payload.location } };    

        case AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION: {
            console.log(action.payload);
            return { ...state, 
                        [action.payload.name]:{ 
                            ...state[action.payload.name],
                            action: (<ExecItemAction>action).payload.itemAction,
                            state: fromEntityReduser.reducer( state[action.payload.name].state, (<ExecItemAction>action).payload.itemAction ) 
                    }}
        };    
        
        case AnyEntityLazySetActionTypes.COMPLETE_ANY_ENTITY_LAZY_ACTION: {
            return { ...state, 
                [action.payload.name]:{ 
                    ...state[action.payload.name],
                    action: null
            }};
        };    

        case AnyEntityLazySetActionTypes.EROR_ANY_ENTITY_SET:{        
                console.log(action);
                return { ...state, error:action.payload };    
            }    

        default:
            return state;
    }
}

 