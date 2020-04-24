import { Component, OnInit } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    constructor(private leaderService: LeaderService, private dishservice: DishService, private promotionservice: PromotionService) {}

    ngOnInit() {
        this.dishservice.getFeaturedDish().then((dish) => (this.dish = dish));
        this.promotion = this.promotionservice.getFeaturedPromotion();
        this.leader = this.leaderService.getFeaturedLeader();
    }
}
