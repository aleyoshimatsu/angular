import { Component, OnInit, Input } from '@angular/core';
import { Client } from './client.model';

@Component({
  selector: 'app-input-binding',
  templateUrl: './input-binding.component.html',
  styleUrls: ['./input-binding.component.css']
})
export class InputBindingComponent implements OnInit {

  @Input()
  name: string = "";

  @Input("othername")
  lastname: string = "";

  @Input()
  age: number;

  clients: Client[];

  constructor() { 
    this.clients = [
      {id: 1, name: "Alexandre", age: 36},
      {id: 2, name: "Melissa", age: 37},
      {id: 3, name: "Vitor", age: 7},
      {id: 4, name: "Gabriel", age: 2}
    ]
  }

  ngOnInit() {
  }

}
