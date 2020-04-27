import { Injectable } from "@angular/core";
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { Observable, of } from "rxjs";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { delay } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class PromotionService {
    constructor() {}

    getPromotions(): Promotion[] {
        return PROMOTIONS;
    }

    getPromotion(id: string): Promotion {
        return PROMOTIONS.filter((promo) => promo.id === id)[0];
    }

    getFeaturedPromotion(): Observable<Promotion> {
        return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    }
}
