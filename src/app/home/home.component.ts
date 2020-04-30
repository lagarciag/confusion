import { Component, Inject, OnInit } from "@angular/core";
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
    dishErrMess: string;
    constructor(
        private leaderService: LeaderService,
        private dishservice: DishService,
        private promotionservice: PromotionService,
        @Inject("BASE_URL") public baseURL
    ) {}

    ngOnInit() {
        this.dishservice.getFeaturedDish().subscribe(
            (dish) => (this.dish = dish),
            (errmess) => (this.dishErrMess = errmess as any)
        );
        this.promotionservice.getFeaturedPromotion().subscribe(
            (promotion) => (this.promotion = promotion),
            (errmess) => (this.dishErrMess = errmess as any)
        );
        this.leaderService.getFeaturedLeader().subscribe(
            (leader) => (this.leader = leader),
            (errmess) => (this.dishErrMess = errmess as any)
        );
    }
}
