import { Action } from '@ngrx/store';
import { EntityAdapter } from "@ngrx/entity";

import { anyEntityLazyActions } from './any-entity-lazy.actions';
import { adapter } from '@appStore/reducers/any-entity-lazy.reduser';

export enum AnyEntityLazySetActionTypes {


    ADD_ANY_ENTITY_LAZY                 = '[Any entity lazy set] Add any entity',
    EXEC_ANY_ENTITY_LAZY_ACTION         = '[Any entity lazy set] Entyty action executing' ,
    COMPLETE_ANY_ENTITY_LAZY_ACTION     = '[Any entity lazy set] Entyty action chain completed' ,
    EROR_ANY_ENTITY_SET                 = '[Any entity lazy set] Error' 
}


export class AddItem implements Action {
    readonly type = AnyEntityLazySetActionTypes.ADD_ANY_ENTITY_LAZY
    constructor(public payload: {name:string , location:string , adapter:EntityAdapter<any>  })  { }
}

export class ExecItemAction implements Action {
    readonly type = AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION
    constructor(public payload: {name:string , itemAction: anyEntityLazyActions  } ) {}
}

export class CompleteItemAction implements Action {
    readonly type = AnyEntityLazySetActionTypes.COMPLETE_ANY_ENTITY_LAZY_ACTION
    constructor(public payload: {name:string} ) {}
}


export class ErrorAnyEntitySet implements Action {
    readonly type = AnyEntityLazySetActionTypes.EROR_ANY_ENTITY_SET;
    constructor(public payload: any) {}
}  

export type AnyEntityLazySetAction =
  | AddItem
  | ExecItemAction
  | CompleteItemAction
  | ErrorAnyEntitySet  
  
  ;