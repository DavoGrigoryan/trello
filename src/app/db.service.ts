import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Carts{
  id?:number,
  title:string,
}
export interface CartsDone{
  id?:number,
  title:string,
}
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http :HttpClient) { }
  // to do Cart
  fetchCarts():Observable<Carts[]>{
    return this.http.get<Carts[]>('http://localhost:3000/cart-create')
  }

  addCart(newCart:Carts):Observable<any>{
    console.log(newCart)
    return this.http.post('http://localhost:3000/cart-create',newCart)
  }
 // end to do Cart

  // Done Cart

  fetchDoneCarts():Observable<CartsDone>{
    return this.http.get<CartsDone>('http://localhost:3000/done-carts')
  }



}
