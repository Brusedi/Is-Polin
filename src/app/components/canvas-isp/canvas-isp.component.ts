import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { DrDrawTest } from 'app/shared/graphics/corel-droch';
import { drawIconTest } from 'app/shared/graphics/jg-canvas/jg-canvas-base';


@Component({
  selector: 'app-canvas-isp',
  templateUrl: './canvas-isp.component.html',
  styleUrls: ['./canvas-isp.component.css']
})
export class CanvasIspComponent implements OnInit , AfterViewInit {


  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;


  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    // get the context
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
   
    drawIconTest(this.context); 

  }

}
