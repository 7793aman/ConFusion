import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

leaders:Leader[]=LEADERS;

  constructor() { }

  getLeaders():Observable<Leader[]>{
    // return new Promise(function (resolve,reject) {
    //   setTimeout(()=>{
    //     resolve(LEADERS);
    //   },2000)
    // })

    return of(LEADERS).pipe(delay(2000));
  }

  getFeaturedLeader():Observable<Leader>{
    var l;
    this.leaders.forEach((leader)=>{
      if(leader.featured){
        l= leader;
      }
    })
    // return new Promise(function (resolve,reject) {
    //   setTimeout(()=>{
    //     resolve(l);
    //   },2000)
    // })
    return of(l).pipe(delay(2000));
  }
}
