import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


getPromotions():Promotion[]
  {
    return PROMOTIONS;
  }

  getPromotion(id:string):Promotion{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.id===id){
        p= promotion;
      }
    })
    return p;
  }
  
  getFeaturedPromotion():Promotion{
    var p;
    PROMOTIONS.forEach((promotion)=>{
      if(promotion.featured){
        p= promotion;
      }
    })
    return p;
  }
}