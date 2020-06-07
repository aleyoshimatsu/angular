import { Component, OnInit } from '@angular/core';
import { Dvd } from '../models/dvd';
import { Observable } from 'rxjs';
import { DvdService } from '../services/dvd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  dvds$: Observable<Dvd[]>;

  constructor(private dvdService: DvdService,
              private router: Router) { }

  ngOnInit(): void {
    this.dvds$ = this.dvdService.dvds$;
  }

  goDetails(i: number, d: Dvd) {
    //console.log(i, d);
    this.router.navigate([`dvds/${i}`, {title: d.title}]);
  }

  remove(i: number) {
    //console.log(i);
    this.dvdService.remove(i);
  }

}
