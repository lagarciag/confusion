import { Component, Inject, OnInit } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { flyInOut } from "../animations/app.animations";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        "[@flyInOut]": "true",
        style: "display: block;",
    },
    animations: [flyInOut()],
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
