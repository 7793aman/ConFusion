import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { catchError, map} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient : HttpClient,private httpMessageService:ProcessHTTPMsgService) { }
  
  getFeaturedPromotion():Observable<Promotion>{
   return this.httpClient.get<Promotion>(baseURL + 'promotions').pipe(
    map(promotions=>promotions[0])
  ).pipe(catchError(this.httpMessageService.handleError));;;
  }
}