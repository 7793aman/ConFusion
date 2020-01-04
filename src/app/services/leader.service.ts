import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators'
import { HttpClient} from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

leaders:Leader[]=LEADERS;

constructor(private httpClient : HttpClient,private httpMessageService:ProcessHTTPMsgService) { }

  getLeaders():Observable<Leader[]>{
    return this.httpClient.get<Leader[]>(baseURL +'leadership').pipe(catchError(this.httpMessageService.handleError));
  }

  getFeaturedLeader():Observable<Leader>{
   return this.httpClient.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders=>leaders[0])).pipe(catchError(this.httpMessageService.handleError));
  }
}
