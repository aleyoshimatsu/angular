import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Dvd } from 'src/app/models/dvd';
import { Observable } from 'rxjs';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.css']
})
export class DvdDetailComponent implements OnInit {

  dvd$: Observable<Dvd>;
  title = null;

  constructor(private route: ActivatedRoute,
              private dvdService: DvdService,
              private router: Router) { }

  ngOnInit(): void {
    let index: number = +this.route.snapshot.paramMap.get('index');
    this.dvd$ = this.dvdService.get(index);
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          if (params.has('title')) {
            this.title = params.get('title');
          }
        }
      );
    
    // this.route.paramMap
    //   .subscribe(
    //     (param: ParamMap) => console.log("Index: ", param.get('index'))
    //   )
  }

  goBack() {
    this.router.navigate(['/dvds']);
  }

}
