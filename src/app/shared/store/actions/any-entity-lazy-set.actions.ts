import { Action } from '@ngrx/store';

export enum AnyEntityLazySetActionTypes {
    ADD_ANY_ENTITY  = '[Any entity set] Add any entity',
}

export class AddAnyItem implements Action {
    readonly type = AnyEntityLazySetActionTypes.ADD_ANY_ENTITY
    constructor(public payload: {name:string , location:string} ) {}
}

export type AnyEntityLazySetAction =
  | AddAnyItem
  ;