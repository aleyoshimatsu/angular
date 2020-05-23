import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map, toArray, delay, tap } from 'rxjs/operators';

interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options$: Observable<string[]>;
  users$: Observable<User>;

  constructor() { }

  ngOnInit(): void {
    this.options$ = Observable.create(
      (observer: Observer<string>) => {
        for (let index = 0; index < 10; index++) {
          observer.next(`This is my ${index}th option`);          
        }
        observer.complete();
      }
    )
    .pipe(
      map(s => s + '!'),
      toArray(),
      delay(1000)
    );

    //this.options$.subscribe(s => console.log(s));

    this.users$ = new Observable<User>(
      (observer: Observer<User>) => {
        let names = ["Mr. James", "Mr. John", "Mr. Ray", "Ms. Angel"];
        let logins = ["james", "john", "ray", "angel"];

        let i = 0;
        setInterval(() => {
          if (i == 4) {
            observer.complete();
          }
          else {
            observer.next({login: logins[i], name: names[i]});
          }
          i++;
        }, 3000);
      }
    );

    //this.users$.subscribe(s => console.log(s));
  }

}
