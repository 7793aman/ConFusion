import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service'
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service'
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader
  dishErr:string;
  promotionErr:string;
  leaderErr:string;

  constructor(private promotionService: PromotionService,
    private dishService: DishService, private leaderService: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {

    this.dishService.getFeaturedDish().subscribe(
      (result) => {
        this.dish = result;
      },
      error=>{
        this.dishErr=error
      } 
      )

    this.promotionService.getFeaturedPromotion().subscribe(
      (value) => {
        this.promotion = value;
      },
      error=>{
        this.promotionErr=error
      }
    )

    this.leaderService.getFeaturedLeader().subscribe(
      (value) => {
        this.leader = value
      },
      error=>{
        this.leaderErr=error
      }
      )

    }
  }
