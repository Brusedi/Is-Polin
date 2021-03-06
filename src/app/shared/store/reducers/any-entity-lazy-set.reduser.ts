import { EntityAdapter } from "@ngrx/entity";

import { AnyEntityLazySetAction, AnyEntityLazySetActionTypes, ExecItemAction  }   from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntytyState }  from "./any-entity-lazy.reduser";
import * as fromEntityReduser from "./any-entity-lazy.reduser"
import { anyEntityLazyActions } from "@appStore/actions/any-entity-lazy.actions";


// Опции для AnyEntityLazy - итема
export interface anyEntityOptions<T>{
    name:       string          
    location:   string                  // http sublocation  key 
    selectId:   (i:T) => any              // entity to id value func    
    selBack:    (any) => string         // id value to http sublocation suffix
} 


// 
export interface AnyEntytySetItemState<T> {
    state      : AnyEntytyState<T>,
    option     : anyEntityOptions<T>
    action?    : anyEntityLazyActions 

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
                                    state:      fromEntityReduser.initStateFromSelFoo( action.payload.selectId),
                                    option:     action.payload,
                                    action:     null 
                                } };    

        case AnyEntityLazySetActionTypes.EXEC : {                                
            action.reduserData = (< AnyEntytySetItemState<any>>state[action.payload.name]).option;
            return {...state};
        }            

        case AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION: {
            //console.log(action.payload);
            //console.log(state);
            var s = { ...state, 
                        [action.payload.itemOption.name]:{ 
                            ...state[action.payload.itemOption.name],
                            action: (<ExecItemAction>action).payload.itemAction,
                            state: fromEntityReduser.reducerFromSelFoo( state[action.payload.itemOption.name].option.selectId )(
                                state[action.payload.itemOption.name].state, (<ExecItemAction>action).payload.itemAction 
                            )     
                    }};
            //console.log(s);        
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

 