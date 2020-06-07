import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DvdDetailComponent } from './dvd/dvd-detail/dvd-detail.component';
import { DvdFormComponent } from './dvd/dvd-form/dvd-form.component';

// const appRoutes: Routes = [
//   { path: 'dvds', component: DvdComponent },
//   { path: 'books', component: BookComponent },
//   { path: '', pathMatch: 'full', redirectTo: 'dvds' },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    DvdComponent,
    PageNotFoundComponent,
    DvdDetailComponent,
    DvdFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
