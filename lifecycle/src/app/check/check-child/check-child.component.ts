import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-child',
  templateUrl: './check-child.component.html',
  styleUrls: ['./check-child.component.css']
})
export class CheckChildComponent implements OnInit {

  constructor() {
    console.log("     constructor");
   }

  ngOnInit() {
    console.log("     ngOnInit");
  }

  ngOnChanges() {
    console.log("     ngOnChanges");
  }

  ngDoCheck() {
    console.log("     ngDoCheck");
  }

  ngAfterContentInit() {
    console.log("     ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("     ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("     ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log(      "ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("     ngOnDestroy");
  }

}
