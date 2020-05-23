import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {

  @ViewChild(MatTable) dataTable: MatTable<any>;

  products: Product[] = [];

  prodColumns: string[] = ["id", "name", "price", "description", "department"];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.onNewProduct.subscribe((p) => {
      this.dataTable.renderRows();
    });
  }

}
