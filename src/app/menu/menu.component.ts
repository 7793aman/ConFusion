import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service'


@Component(
  {
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
  }
)
export class MenuComponent implements OnInit {

  dishes: Dish[];
  myService: DishService
  errMsg:String  

  constructor(private dishService: DishService,@Inject('BaseURL') private baseURL) {
    this.myService = dishService
  }

  ngOnInit() {
    
    this.dishService.getDishes().subscribe(
      (dishes) => {
        this.dishes = dishes;
      },(error)=>{
        this.errMsg=error;
      })

  }
}
