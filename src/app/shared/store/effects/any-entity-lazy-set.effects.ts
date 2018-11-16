import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { DataProvService } from "app/shared/services/data-prov.service";

import { AnyEntityLazySetActionTypes, ExecItemAction, ErrorAnyEntitySet, CompleteItemAction } from "@appStore/actions/any-entity-lazy-set.actions";
import { AnyEntityLazyActionTypes, anyEntityLazyActions, GetItemSuccess, GetItemNotFound, ErrorAnyEntity, GetItem } from "@appStore/actions/any-entity-lazy.actions";


@Injectable()
export class anyEntytySetEffects {
  constructor(
      private actions$: Actions, 
      private dataService: DataProvService
) {}

    procSubAction = ( action : anyEntityLazyActions, loc: string ): Observable<any> => {

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


    @Effect()   //.insert(action.payload.location, action.payload.data)
    ExecItemAction$ = this.actions$.pipe(
        ofType(AnyEntityLazySetActionTypes.EXEC_ANY_ENTITY_LAZY_ACTION),
        switchMap( (action: ExecItemAction) => {
             console.log('333'); 
             const subAct$ = this.procSubAction(action.payload.itemAction, "/NvaAx/NVAOMACUSTLOGO") ;
             return subAct$ 
                //.tap( x=>console.log(x) )
                .map( x => x != null ? 
                        new ExecItemAction( { name: action.payload.name, itemAction:x   } ) : 
                        new CompleteItemAction({ name: action.payload.name} )         
                );

                    // (this.procSubAction(action.payload.itemAction, "/NvaAx/NVAOMACUSTLOGO")
                    //     .map( x => new ExecItemAction( { name: action.payload.name, itemAction:x   } ) ))
            //);
        })
    );        

   

}

// @Effect()   //.insert(action.payload.location, action.payload.data)
// addItem$ = this.actions$.pipe(
//     ofType(flightFidsActionTypes.GetFlights),
//     switchMap(() =>
//       this.dataService.getData()
//        .pipe(
//          map(x => new GetFlightsSuccess (x)),
//          catchError(error => Observable.of(new ErrorFlights(error)))
//        )
//   )
// );


            //(action: ExecItemAction) =>   new ExecItemAction( {name: "Жопа", itemAction:  new ErrorAnyEntity("Not found action handler")}  )  
        
    //);   
        // { 
        //     console.log(action.payload.itemAction);
        //     return 

        //         //this.procSubAction(action.payload.itemAction,  "/NvaAx/NVAOMACUSTLOGO" )

        //         // .pipe( 
        //         //     map( x => new ExecItemAction( {...action.payload, itemAction: x  }  )  ) 
        //         //   ) ;
            
        // } )
    //);

    // procSubAction = ( action : anyEntityLazyActions, loc: string ) => {
    //     switch(action.type){
    //         case ( AnyEntityLazyActionTypes.GET_ITEM ) :
    //             return this.dataService.items( loc, "?CUSTACCOUNT="+action.payload )
    //                 .map( x => x.length > 0 ? 
    //                     new GetItemSuccess(x[0]) :
    //                     new GetItemNotFound( action.payload ) 
    //                 ); 
    //         default:
    //             return Observable.of(new ErrorAnyEntity("Not found action handler"));
    //     }

    //}    
//}