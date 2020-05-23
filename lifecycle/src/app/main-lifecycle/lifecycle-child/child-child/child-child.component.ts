import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-child',
  templateUrl: './child-child.component.html',
  styleUrls: ['./child-child.component.css']
})
export class ChildChildComponent implements OnInit {

  @Input() name: string;
  
  constructor() { }

  ngOnInit() {
    console.log(this.name + " - Child Child - ngOnInit");
  }

  ngOnChanges() {
    console.log(this.name + " - Child Child - ngOnChanges");
  }

  ngAfterContentInit() {
    console.log(this.name + " - Child Child - ngAfterContentInit");
  }

}
