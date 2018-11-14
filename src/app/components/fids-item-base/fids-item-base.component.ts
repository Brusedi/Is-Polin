import { Component, OnInit, Input } from '@angular/core';
import { FlightFids } from '@appModels/flight-fids';


@Component({
  selector: 'app-fids-item-base',
  templateUrl: './fids-item-base.component.html',
  styleUrls: ['./fids-item-base.component.css']
})
export class FidsItemBaseComponent implements OnInit {

  @Input() private flight : FlightFids  ;

  constructor() { }

  ngOnInit() {
    
  }

}
