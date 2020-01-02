import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators'

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

  // getDishes():Promise<Dish[]>
  // {
  //   // return new Promise(function (resolve,reject) {
  //   //   setTimeout(()=>{
  //   //     resolve(DISHES);
  //   //   },2000)
  //   // })
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }

  // getDish(id:string):Promise<Dish>{
  //   var d:Dish;
  //   this.dishes.forEach((dish)=>{
  //     if(dish.id===id){
  //       d= dish;
  //     }
  //   })
  //   // return new Promise(function (resolve,reject) {
  //   //   setTimeout(()=>{
  //   //     resolve(d);
  //   //   },2000)
  //   // })

  //   return of(d).pipe(delay(2000)).toPromise();
  // }
  
  // getFeaturedDish():Promise<Dish>{
  //   var d:Dish;
  //   this.dishes.forEach((dish)=>{
  //     if(dish.featured){
  //       d= dish;
  //     }
  //   })
  //   // return new Promise(function (resolve,reject) {
  //   //   setTimeout(()=>{
  //   //     resolve(d);
  //   //   },2000)
  //   // })

  //   return of(d).pipe(delay(2000)).toPromise();
  // }


  getDishes():Observable<Dish[]>
  {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id:string):Observable<Dish>{
    var d:Dish;
    this.dishes.forEach((dish)=>{
      if(dish.id===id){
        d= dish;
      }
    })
      return of(d).pipe(delay(2000));
  }
  
  getFeaturedDish():Observable<Dish>{
    var d:Dish;
    this.dishes.forEach((dish)=>{
      if(dish.featured){
        d= dish;
      }
    })
    return of(d).pipe(delay(2000));
  }
}
