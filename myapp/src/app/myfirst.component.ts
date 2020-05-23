import { Component } from "@angular/core";

@Component({
    selector: 'myfirst', // Poderia utilizar entre [myfirst] -> diretiva <div myfirst/>
                        // Poderia utilizar entre .myfirst -> diretiva <div class="myfirst"/>
    templateUrl: './myfirst.component.html',
    styleUrls: ['./myfirst.component.css']
})
export class MyFirstComponent {

}