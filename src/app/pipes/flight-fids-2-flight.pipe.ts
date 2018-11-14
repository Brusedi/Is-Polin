import { Pipe, PipeTransform } from '@angular/core';
import { FlightFids } from '@appModels/flight-fids';

@Pipe({
  name: 'flightFids2Flight'
})
export class FlightFids2FlightPipe implements PipeTransform {

  transform(value: FlightFids ): any {
    return value.company + " "+ value.flight;
  }

}
