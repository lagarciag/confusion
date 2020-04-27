import { Injectable } from "@angular/core";
import { LEADERS } from "../shared/leaders";
import { Leader } from "../shared/leader";
import { delay } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";

@Injectable({
    providedIn: "root",
})
export class LeaderService {
    constructor() {}

    getLeaders(): Observable<Leader[]> {
        return of(LEADERS).pipe(delay(2000));
    }

    getLeader(id: string): Observable<Leader> {
        return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));
        // return LEADERS.filter((leader) => leader.id === id)[0];
    }

    getFeaturedLeader(): Observable<Leader> {
        return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    }
}
