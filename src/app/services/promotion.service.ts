import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import {delay} from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


getPromotions():Observable<Promotion[]>
  {
   // return Promise.resolve(PROMOTIONS);
   return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id:string):Observable<Promotion>{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.id===id){
        p= promotion;
      }
    })
    // return Promise.resolve(p);
    return of(p).pipe(delay(2000));
  }
  
  getFeaturedPromotion():Observable<Promotion>{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.featured){
        p= promotion;
      }
    })
    // return new Promise(function (resolve,reject) {
    //   setTimeout(()=>{
    //     resolve(p);
    //   },2000)
    // })
    return of(p).pipe(delay(2000));
  }
}