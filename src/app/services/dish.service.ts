import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { Observable} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DishService {

  dishes:Dish[];

  constructor(private httpClient:HttpClient,private httpMessageService:ProcessHTTPMsgService) {
    this.dishes=DISHES;
   }

  getDishes():Observable<Dish[]>
  {
    return this.httpClient.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.httpMessageService.handleError));
  }

  getDish(id:string):Observable<Dish>{
    return this.httpClient.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.httpMessageService.handleError));
  }
  
  getFeaturedDish():Observable<Dish>{
    //since return type is observable we have to use map
    return this.httpClient.get<Dish>(baseURL + 'dishes?featured=true').pipe(
      map(dishes=>dishes[0])
    ).pipe(catchError(this.httpMessageService.handleError));;
  }

  getDishIds():Observable<string[] | any>{
    return this.httpClient.get<any>(baseURL + 'dishes').pipe(map(dishes => dishes.map(dish=>dish.id))).pipe(catchError((error)=> error);
  }

  putDish(dish:Dish):Observable<Dish>{

    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.httpClient.put<Dish>(baseURL + 'dishes/' + dish.id,Dish,httpOptions).pipe(catchError(this.httpMessageService.handleError));
  }
}
