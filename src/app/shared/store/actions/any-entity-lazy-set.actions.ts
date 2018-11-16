import { Action } from '@ngrx/store';
import { anyEntityLazyActions } from './any-entity-lazy.actions';

export enum AnyEntityLazySetActionTypes {
    ADD_ANY_ENTITY_LAZY                 = '[Any entity lazy set] Add any entity',
    EXEC_ANY_ENTITY_LAZY_ACTION         = '[Any entity lazy set] Entyty action execute' ,
    COMPLETE_ANY_ENTITY_LAZY_ACTION     = '[Any entity lazy set] Entyty action execute' ,
    EROR_ANY_ENTITY_SET                 = '[Any entity lazy set] Error' 
}

export class AddItem implements Action {
    readonly type = AnyEntityLazySetActionTypes.ADD_ANY_ENTITY_LAZY
    constructor(public payload: {name:string , location:string} ) {}
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