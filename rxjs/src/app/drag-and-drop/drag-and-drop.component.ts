import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect', {static: true})
  myrect: ElementRef

  top: number = 40;
  left: number = 40;

  constructor() { }

  ngOnInit(): void {
    let mouseDown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mouseMove = fromEvent(document, 'mousemove');
    let mouseUp = fromEvent(document, 'mouseup');

    mouseDown.subscribe((ed: MouseEvent) => {
      //console.log(ed);

      let x = ed.pageX;
      let y = ed.pageY;

      mouseMove
      .pipe(
        takeUntil(mouseUp)
      )
      .subscribe((em: MouseEvent) => {
        //console.log(em);

        let offsetx = x - em.pageX;
        let offsety = y - em.pageY;

        this.top -= offsety;
        this.left -= offsetx;

        x = em.pageX;
        y = em.pageY;
      });
    });
  }

}
