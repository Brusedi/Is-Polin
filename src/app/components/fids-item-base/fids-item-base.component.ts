import { Component, OnInit, Input } from '@angular/core';
import { FlightFids } from '@appModels/flight-fids';
import { Store, select } from '@ngrx/store';

import  *  as fromStore   from '@appStore/index';
import * as fromSelectors from '@appStore/selectors/index';
import { filter, map } from 'rxjs/operators';
import { Exec } from '@appStore/actions/any-entity-lazy-set.actions';
import { GetItem } from '@appStore/actions/any-entity-lazy.actions';
import { Observable } from 'rxjs/Observable';
import { CompanyImages } from '@appModels/any-entity';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-fids-item-base',
  templateUrl: './fids-item-base.component.html',
  styleUrls: ['./fids-item-base.component.css']
})
export class FidsItemBaseComponent implements OnInit {

  @Input() private flight : FlightFids  ;

  image$: Observable<{}>;

  constructor(private store: Store<fromStore.State>, private sanitizer : DomSanitizer ) { }

  ngOnInit() {

    this.image$ =  this.store.pipe( 
        select(fromSelectors.selectReferenceItem("CompanyImages", this.flight.company)),
        filter( x => x!= undefined ),
        map( (x:CompanyImages) => "data:image/png;base64,"+ x.imageB64),
        map( x => this.sanitizer.bypassSecurityTrustUrl(x))
      ); 

    //this.image$.subscribe((x:CompanyImages)=>console.log(x.recid) );

    //this.image$.subscribe(x=>console.log(x));

    this.store.select( fromSelectors.selectItemWasSearhing("CompanyImages", this.flight.company ) )
      .pipe( filter( x => !x ))
      .subscribe( () =>   
          this.store.dispatch(  new Exec(  { name: "CompanyImages" , itemAction: new GetItem( this.flight.company ) }  ))
      );
  }

}
