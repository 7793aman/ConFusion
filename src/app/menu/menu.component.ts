import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish'
import {DishService} from '../services/dish.service'


@Component(
  {
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
  }
)
export class MenuComponent implements OnInit {

  //name of variable :type of variable = assignment of data
  dishes:Dish[];
  myService:DishService
  //declaration of variable with its type
  selectedDish:Dish;

  constructor(private dishService:DishService) { 
    this.myService=dishService
  }

  ngOnInit() {
    this.dishes=this.myService.getDishes();
  }

  onSelect(dish:Dish){
    this.selectedDish=dish;
  }

}
