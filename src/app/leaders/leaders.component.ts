import { Component, OnInit } from "@angular/core";
import { Leader } from "../shared/leader";
import { DishService } from "../services/dish.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { LeaderService } from "../services/leader.service";

@Component({
    selector: "app-leaders",
    templateUrl: "./leaders.component.html",
    styleUrls: ["./leaders.component.css"],
})
export class LeadersComponent implements OnInit {
    leaders: Leader[];

    constructor(private leaderservice: LeaderService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        this.leaders = this.leaderservice.getLeaders();
    }
}
