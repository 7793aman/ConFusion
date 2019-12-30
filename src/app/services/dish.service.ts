import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';

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

  getDishes():Dish[]
  {
    return DISHES;
  }

  getDish(id:string):Dish{
    var d;
    this.dishes.forEach((dish)=>{
      if(dish.id===id){
        d= dish;
      }
    })
    return d;
  }
  
  getFeaturedDish():Dish{
    var d;
    this.dishes.forEach((dish)=>{
      if(dish.featured){
        d= dish;
      }
    })
    return d;
  }
}
