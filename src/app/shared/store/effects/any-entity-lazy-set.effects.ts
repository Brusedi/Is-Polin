import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { DataProvService } from "app/shared/services/data-prov.service";

import { AnyEntityLazySetActionTypes, ExecItemAction, ErrorAnyEntitySet, CompleteItemAction } from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntityLazyActionTypes, anyEntityLazyActions, GetItemSuccess, GetItemNotFound, ErrorAnyEntity, GetItem } from "@appStore/actions/any-entity-lazy.actions";
import { Store } from "@ngrx/store";
import {  } from "../reducers";
import { State } from "..";

//import { State } from "@appStore/reducers/any-entity-lazy-set.reduser";




@Injectable()
export class anyEntytySetEffects {
  constructor(
      private actions$: Actions, 
      private store$: Store<State>,
      private dataService: DataProvService
) {}

    @Effect()   //.insert(action.payload.location, action.payload.data)
    ExecItemAction$ = this.actions$.pipe(
        ofType(AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION),
        withLatestFrom(  this.store$),
        map( ([act,store]) => ({ action: <ExecItemAction>act  , store }) ),
        mergeMap( x => this.procNextSubAction(
                x.action, 
                this.procSubAction(x.action.payload.itemAction, x.store.references[x.action.payload.name].location ) 
        ) ) );    


    private procSubAction = ( action : anyEntityLazyActions, loc: string ): Observable<any> => {
        switch(action.type){
            case ( AnyEntityLazyActionTypes.GET_ITEM ) :
                return this.dataService.items( loc, "?CUSTACCOUNT="+action.payload ) 
                      .map( x => x.length > 0 ? 
                          new GetItemSuccess(x[0]) :
                          new GetItemNotFound( action.payload ) 
                      ); 
                        
            default:
                return Observable.of(null);
        }
    }   
    
    private procNextSubAction = ( act : ExecItemAction,  act$: Observable<any> ): Observable<any> => 
        act$.pipe(
            map(x  =>  x != null ? 
                    new ExecItemAction( { name: act.payload.name, itemAction: x } ) : 
                    new CompleteItemAction({ name: act.payload.name } ) 
            )
        );       
}
