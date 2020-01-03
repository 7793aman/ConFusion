import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DishService {

  dishes:Dish[];

  constructor(private httpClient:HttpClient) {
    this.dishes=DISHES;
   }

  getDishes():Observable<Dish[]>
  {
    return this.httpClient.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id:string):Observable<Dish>{
    return this.httpClient.get<Dish>(baseURL + 'dishes/' + id);
  }
  
  getFeaturedDish():Observable<Dish>{
    //since return type is observable we have to use map
    return this.httpClient.get<Dish>(baseURL + 'dishes?featured=true').pipe(
      map(dishes=>dishes[0])
    );
  }

  getDishIds():Observable<string[] | any>{
    return this.httpClient.get<any>(baseURL + 'dishes').pipe(map(dishes => dishes.map(dish=>dish.id)));
  }
}
