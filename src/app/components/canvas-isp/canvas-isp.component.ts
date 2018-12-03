import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { DrDrawTest } from 'app/shared/graphics/corel-droch';


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
    //this.context.fillRect(0, 0, 100, 100);
    this.context.beginPath();
    this.context.moveTo(10, 15);
    this.context.bezierCurveTo(75, 55, 175, 20, 250, 15);
    this.context.moveTo(10, 15);
    this.context.quadraticCurveTo(100, 100, 250, 15);
    this.context.stroke();

    DrDrawTest(this.context);

  }

}
