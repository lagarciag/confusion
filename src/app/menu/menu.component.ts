import { Component, Inject, OnInit } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
    dishes: Dish[];
    errMess: string;
    ngOnInit(): void {
        this.dishService.getDishes().subscribe(
            (dishes) => (this.dishes = dishes),
            (errmess) => (this.errMess = errmess as any)
        );
    }

    constructor(private dishService: DishService, @Inject("BASE_URL") public baseURL) {}
}
