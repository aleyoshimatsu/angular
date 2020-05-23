import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';
import { filter, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  simpleReqProductsObs$: Observable<Product[]>;

  productsErrorHandling: Product[];

  productsLoading: Product[];
  bLoading: boolean = false;

  productsId: Product[];

  newlyProducts: Product[] = [];

  productsToDelete: Product[] = [];

  productsToEdit: Product[] = [];

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.productsService.getProductsErr()
      .subscribe(
        (prod) => {this.productsErrorHandling = prod;},
        (err) => {
          console.log(err);
          console.log('Message: ' + err.error);
          console.log('Status code: ' + err.status);

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_error'];

          if (err.status == 0)
            this.snackBar.open('Could not connect to the server', '', config);
          else
            this.snackBar.open(err.error, '', config);
        }
      );
  }

  getProductsWithErrorHandlingOK() {
    this.productsService.getProductsDelay()
      .subscribe(
        (prod) => {
          this.productsErrorHandling = prod;

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_ok'];

          this.snackBar.open('Products Sucessfully loaded', '', config);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getProductsLoading() {
    this.bLoading = true;
    this.productsService.getProductsDelay()
      .subscribe(
        (prod) => {
          this.productsLoading = prod;
          this.bLoading = false;
        },
        (err) => {
          console.log(err);
          this.bLoading = false;
        }
      );
  }

  getProductsId() {
    this.productsService.getProductsIds()
      .subscribe(
        (ids) => {
          this.productsId = ids.map(id => ({
            _id: id, name: '', department: '', price: 0
          }));
        }
      );
  }

  loadName(id: string) {
    this.productsService.getProductsName(id)
      .subscribe(
        (name) => {
          let index = this.productsId.findIndex(p => p._id === id);

          if (index >= 0)
            this.productsId[index].name = name;
        }
      );
  }

  saveProduct(name: string, department: string, price: number) {
    let p = {name, department, price};

    this.productsService.saveProduct(p)
      .subscribe(
        (p: Product) => {
          console.log(p);

          this.newlyProducts.push(p);

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_ok'];

          this.snackBar.open('Product Sucessfully saved', '', config);
        },
        (err) => {
          console.log(err);

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_error'];

          if (err.status == 0)
            this.snackBar.open('Could not connect to the server', '', config);
          else
            this.snackBar.open(err.error, '', config);
        }
      );
  }

  loadProductsToDelete() {
    this.productsService.getProducts()
      .subscribe((prods) => this.productsToDelete = prods);
  }

  deleteProduct(p: Product) {
    this.productsService.deleteProduct(p)
      .subscribe(
        (res) => {
          console.log(res);

          let i = this.productsToDelete.findIndex(prod => p._id == prod._id);
          if (i >= 0) {
            this.productsToDelete.splice(i, 1);
          }

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_ok'];

          this.snackBar.open('Product Sucessfully deleted', '', config);
        },
        (err) => {
          console.log(err);

          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_error'];

          if (err.status == 0)
            this.snackBar.open('Could not connect to the server', '', config);
          else
            this.snackBar.open(err.error, '', config);
        }
      );
  }

  loadProductsToEdit() {
    this.productsService.getProducts()
      .subscribe((prods) => this.productsToEdit = prods);
  }

  editProduct(p: Product) {
    let newProduct: Product = {...p};
    let dialogRef = this.dialog.open(DialogEditProductComponent, {width: '400px', data: newProduct});

    // dialogRef.afterClosed()
    //   .subscribe((res: Product) => {
        
    //     if (res) {
    //       this.productsService.editProduct(res)
    //         .subscribe(
    //           (resp) => {
    //             let i = this.productsToEdit.findIndex(prod => p._id == prod._id);
    //             if (i >= 0) {
    //               this.productsToEdit[i] = resp;
    //             }
    //           },
    //           (err) => {
    //             console.log(err);
    //           }
    //         )
    //     }
    //   });

      dialogRef.afterClosed()
        .pipe(
          tap(prod => console.log(prod)),
          filter(prod => prod),
          mergeMap(prod => this.productsService.editProduct(prod))
        )
        .subscribe((s) => {
          let i = this.productsToEdit.findIndex(prod => p._id == prod._id);
          if (i >= 0) {
            this.productsToEdit[i] = s;
          }
          console.log('success');
        });
  }

}
