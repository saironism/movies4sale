import { Injectable } from '@angular/core';
import { Product } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    { id: 1,
      name: '3 Idiots - 2009',
      price: 350,
      qty: 1
    },
    { id: 2,
      name: 'The Entitled - 2022',
      price: 350,
      qty: 1
    },
    { id: 3,
      name: 'KungFu Dunk - 2008',
      price: 400,
      qty: 1
    },
    { id: 1,
      name: 'Metamorphosis - 2019',
      price: 400,
      qty: 1
    },
    { id: 2,
      name: 'Spirited Away - 2001',
      price: 450,
      qty: 1
    },
    { id: 3,
      name: 'Orphan - 2009',
      price: 500,
      qty: 1
    },
    { id: 1,
      name: 'Transformers: The Last Knight - 2017',
      price: 500,
      qty: 1
    },
    { id: 2,
      name: 'Hello World - 2019',
      price: 500,
      qty: 1
    },
    { id: 3,
      name: 'Love is Colorblind - 2021',
      price: 500,
      qty: 1
    }
  ]

  private cart = []
  private cartItemCount = new BehaviorSubject(0);
  
  
  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.qty += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				item.qty -= 1;
				if (item.qty === 0) {
					this.cart.splice(index, 1);
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				this.cartItemCount.next(this.cartItemCount.value - item.qty);
				this.cart.splice(index, 1);
			}
		}
  }
}
