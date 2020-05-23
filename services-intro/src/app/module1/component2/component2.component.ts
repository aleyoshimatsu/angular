import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Service2Service } from 'src/app/service2.service';

@Component({
  selector: 'app-component2',
  //providers: [Service1],
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {

  num = 0;
  text = "";

  constructor(private myService: Service1Service, private myService2: Service2Service) { }

  ngOnInit() {
    this.num = this.myService.num;
    this.text = this.myService2.text;
  }

}
