import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish'
import {DISHES} from '../shared/dishes'


@Component(
  {
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
  }
)
export class MenuComponent implements OnInit {

  //name of variable :type of variable = assignment of data
  dishes:Dish[] =DISHES;

  //declaration of variable with its type
  selectedDish:Dish;

  constructor() { }

  ngOnInit() {
  }

  onSelect(dish:Dish){
    this.selectedDish=dish;
  }

}
