import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


getPromotions():Promise<Promotion[]>
  {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id:string):Promise<Promotion>{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.id===id){
        p= promotion;
      }
    })
    return Promise.resolve(p);
  }
  
  getFeaturedPromotion():Promise<Promotion>{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.featured){
        p= promotion;
      }
    })
    return Promise.resolve(p);
  }
}