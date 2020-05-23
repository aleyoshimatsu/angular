import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentFormComponent,
    ProductFormComponent,
    ProductsGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
