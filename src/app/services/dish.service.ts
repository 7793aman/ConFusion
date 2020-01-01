import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { promise } from 'protractor';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DishService {

  dishes:Dish[];

  constructor() {
    this.dishes=DISHES;
   }

  getDishes():Promise<Dish[]>
  {
    return Promise.resolve(DISHES);
  }

  getDish(id:string):Promise<Dish>{
    var d;
    this.dishes.forEach((dish)=>{
      if(dish.id===id){
        d= dish;
      }
    })
    return Promise.resolve(d);
  }
  
  getFeaturedDish():Promise<Dish>{
    var d;
    this.dishes.forEach((dish)=>{
      if(dish.featured){
        d= dish;
      }
    })
    return Promise.resolve(d);
  }
}
