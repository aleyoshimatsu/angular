import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, Subscription, interval, Observable, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  searchInput: string = '';

  @ViewChild(MatRipple)
  ripple: MatRipple;

  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }

  mapClick() {
    const subscription = from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => 2*i),
        map(i => 10*i),
        delay(2000)
      )
      .subscribe(i => console.log(i));
    this.subscription.add(subscription);

    const subscription2 = fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
      )
      .subscribe(i => console.log(i));
    this.subscription.add(subscription2);
  }

  filterClick() {
    const subscription = from([1, 2, 3, 4, 5, 6, 7])
    .pipe(
      filter(i => i%2 == 1)
    )
    .subscribe(i => console.log(i));
    this.subscription.add(subscription);

    const subscription2 = interval(1000)
      .pipe(
        filter(i => i%2 == 0),
        map(i => 'Value: ' + i),
        delay(1000)
      )
      .subscribe(i => console.log(i));
      this.subscription.add(subscription2);
  }

  tapClick() {
    const subscription2 = interval(1000)
      .pipe(
        tap(i => console.log(i)),
        tap(i => console.warn('Before filtering: ', i)),
        filter(i => i%2 == 0),
        tap(i => console.warn('After filtering: ', i)),
        map(i => 'Value: ' + i),
        tap(i => console.warn('After mapping: ', i)),
        delay(1000)
      )
      .subscribe(i => console.log(i));
      this.subscription.add(subscription2);
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i = 0;

      for (i = 0; i < 20; i++) {
        setTimeout(() => {
          observer.next(Math.floor(Math.random()*1000))
        }, i*100);        
      }

      setTimeout(() => {
        observer.complete()
      }, i*100);   

    });

    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        //take(10) //Unsubscribe automatico
        //first(),
        last()
      )
      .subscribe(
        v => console.log('Output: ', v),
        (error) => console.error(error),
        () => console.log('complete')
      );
    this.subscription.add(s);
    
    const interv = setInterval(
      () => {
        console.log('Checking...');
        if (s.closed) {
          console.warn('Subscription CLOSED');
          clearInterval(interv);
        }
      }, 200);
  }

  lauchRipple() {
    const rippleRef = this.ripple.launch({persistent: true, centered: true});
    rippleRef.fadeOut();
  }

  debounceTimeClick() {
    fromEvent(document, 'click')
      .pipe(
        tap((e) => console.log("click")),
        debounceTime(1000)
      )
      .subscribe(
        (e: MouseEvent) => {
          console.log("Click with debounceTime", e);
          this.lauchRipple();
      })
  }

  debounceTimeSearch() {
    this.searchEntry$
      .pipe(
        debounceTime(500)
      )
      .subscribe(s => console.log(s));
  }

  searchEntry$: Subject<string> = new Subject<string>();

  searchBy_UsingDebounce(e: Event) {
    this.searchEntry$.next(this.searchInput);
  }

  takeWhileClick() {
    interval(500)
      .pipe(
        takeWhile((value,index) => (value<5))
      )
      .subscribe(
        (i) => console.log('takeWhile: ', i),
        (error) => console.error(error),
        () => console.log('completed!')
      )
  }

  takeUntilClick() {

    let dutTime = timer(5000);

    interval(500)
    .pipe(
      takeUntil(dutTime)
    )
    .subscribe(
      (i) => console.log('takeWhile: ', i),
      (error) => console.error(error),
      () => console.log('completed!')
    )
  }

}
