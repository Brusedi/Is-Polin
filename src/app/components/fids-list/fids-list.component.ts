import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import  *  as fromStore   from '@appStore/index';

@Component({
  selector: 'app-fids-list',
  templateUrl: './fids-list.component.html',
  styleUrls: ['./fids-list.component.css']
})
export class FidsListComponent implements OnInit {

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

}
