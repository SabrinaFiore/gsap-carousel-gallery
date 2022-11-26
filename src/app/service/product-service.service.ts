import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class productService {
  constructor(private httpClient: HttpClient) { }
  err!: any;

  createProduct(): Observable<any> {
    // https://api.coindesk.com/v1/bpi/currentprice.json

    // https://random.dog/doggos
    return this.httpClient.get<any[]>('https://random.dog/doggos').pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.err)
    );
  }


  // fecth products from databse
  fetchProduct() {

  }

  // delete all products from database
  deleteAllProduct() {

  }
}
