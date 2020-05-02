import { Component, Inject, OnInit } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { expand, flyInOut } from "../animations/app.animations";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    animations: [flyInOut(), expand()],
})
export class HomeComponent implements OnInit {
    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    dishErrMess: string;
    promoErrMess: string;
    leaderErrMess: string;

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
            (errmess) => (this.promoErrMess = errmess as any)
        );
        this.leaderService.getFeaturedLeader().subscribe(
            (leader) => (this.leader = leader),
            (errmess) => (this.leaderErrMess = errmess as any)
        );
    }
}
