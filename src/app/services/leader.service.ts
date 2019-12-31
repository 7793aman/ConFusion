import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

leaders:Leader[]=LEADERS;

  constructor() { }

  getLeaders():Leader[]{
    return this.leaders;
  }

  getFeaturedLeader():Leader{
    var l;
    this.leaders.forEach((leader)=>{
      if(leader.featured){
        l= leader;
      }
    })
    return l;
  }
}
