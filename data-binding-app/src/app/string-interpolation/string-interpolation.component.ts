import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-interpolation',
  templateUrl: './string-interpolation.component.html',
  styleUrls: ['./string-interpolation.component.css']
})
export class StringInterpolationComponent implements OnInit {

  firstname = "Alexandre";
  age = 36;
  person = {
    firstname: "Vitor",
    lastname: "Yoshimatsu",
    age: 7,
    address: "Rodovia Raposo Tavares"
  }

  constructor() { }

  ngOnInit() {
  }

}
