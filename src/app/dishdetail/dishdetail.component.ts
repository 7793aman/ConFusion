import { Component, OnInit  } from '@angular/core';
import {Dish} from '../shared/dish'
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  //@Input()
  //oneWayBindedDish:Dish;
  dish:Dish;
  constructor(private dishService:DishService,
    private location:Location,private route:ActivatedRoute ) {}

  ngOnInit() {
    let id=this.route.snapshot.params['id'];
    // this.dishService.getDish(id).then((result) => {
    //   this.dish = result
    // }).catch((error) => {
    //   console.log(error);
    // });
    this.dishService.getDish(id).subscribe((value)=> this.dish = value)
  }

  goBack():void{
    this.location.back();
  }

}
