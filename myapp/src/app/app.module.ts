import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyFirstComponent } from './myfirst.component';
import { MysecondComponent } from './mysecond/mysecond.component';
import { MyThirdComponent } from './mysecond/my-third/my-third.component';


@NgModule({
  declarations: [
    AppComponent,
    MyFirstComponent,
    MysecondComponent,
    MyThirdComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
