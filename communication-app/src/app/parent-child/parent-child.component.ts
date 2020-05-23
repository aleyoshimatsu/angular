import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})
export class ParentChildComponent implements OnInit {

  @ViewChild("stopwatch2", {static: false})
  private mytimer: TimerComponent;

  @ViewChild("myP", {static: false})
  private myP: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  start() {
    this.mytimer.start();
  }

  stop() {
    this.mytimer.stop();
  }

  clear() {
    this.mytimer.clear();
  }

  ngAfterViewInit() {
    console.log(this.myP);
  }

}
