


import { Component, OnInit } from '@angular/core';
import {Carts, CartsDone, DbService} from "../db.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {

  constructor(private dbService: DbService, private http: HttpClient) {
  }

  form: FormGroup | any
  carts: Carts[] = [];
  cartsDone: CartsDone | any = []
  open = false

  ngOnInit() {

    this.form = new FormGroup({
      cartName: new FormControl('',
        [Validators.required])
    })
    this.fetchCarts()
    this.fetchDoneCarts()

  }

  fetchCarts() {
    this.dbService.fetchCarts()
      .subscribe(resp => {
        this.carts = resp
      })
  }

  addCart() {
    if (this.form.valid) {
      this.dbService.addCart({
        title: this.form.value.cartName
      })
        .subscribe(resp => {
          this.carts.push(resp)
          this.form.reset()
        })
    }
  }


  // Done
  moveCart(data: any[]) {
    this.http.post('http://localhost:3000/done-carts/', data).subscribe()
  }

  removeCartToDo(id: number) {

    this.http.delete<any>(`http://localhost:3000/cart-create/${id}`).subscribe()
  }

  fetchDoneCarts() {
    this.dbService.fetchDoneCarts()
      .subscribe(resp => {
        this.cartsDone = resp
      })
  }

  //end Done
  cartsList: any;

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(this.carts, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
