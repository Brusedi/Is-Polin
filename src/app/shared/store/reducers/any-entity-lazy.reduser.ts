import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { AnyEntity } from "@appModels/any-entity";
import { anyEntityLazyActions, AnyEntityLazyActionTypes } from "@appStore/actions/any-entity-lazy.actions";


export interface AnyEntytyState extends EntityState<AnyEntity> {
    loaded: boolean;
    loading: boolean;
    error: any;
    notExistKeys:any[];
}

export const adapter: EntityAdapter<AnyEntity> = createEntityAdapter<AnyEntity>();

export const anyEntytyinitialState: AnyEntytyState = adapter.getInitialState({
    loaded: false,
    loading: false,
    error: null,
    notExistKeys: []  
  });


export function reducer(state = anyEntytyinitialState, action: anyEntityLazyActions): AnyEntytyState {
    const removeIfExit = (x:any[], v:any ) => x.indexOf(v) > 0 ? x.slice( x.indexOf(v), 1): x ; 
    console.log(action)
    switch (action.type) {
        case AnyEntityLazyActionTypes.GET_ITEM:
            return { ...state, loading: true };    
            
        case AnyEntityLazyActionTypes.GET_ITEM_SUCCESS:
            return adapter.addOne(
                action.payload,
                { ...state , loaded: false, loading: true, notExistKeys: removeIfExit(state.notExistKeys, action.payload ) }
            );  

        case AnyEntityLazyActionTypes.GET_ITEM_NOT_FOUND:
            return adapter.removeOne(
                action.payload,
                { ...state , loaded: false, loading: true, notExistKeys: [  ...state.notExistKeys , action.payload ] }
            );  
            
        case AnyEntityLazyActionTypes.EROR_ANY_ENTITY:
            return { ...state, loaded: false, loading: false, error:  action.payload};            
            
        default:
            return state;
    }
}

 export const anyEntityLazySelectors = adapter.getSelectors();