import { Injectable } from "@angular/core";
import { LEADERS } from "../shared/leaders";
import { Leader } from "../shared/leader";
import { catchError, delay, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { baseURL } from "../shared/baseURL";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { Dish } from "../shared/dish";

@Injectable({
    providedIn: "root",
})
export class LeaderService {
    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) {}

    getLeaders(): Observable<Leader[]> {
        return this.http.get<Leader[]>(baseURL + "leaders").pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getLeader(id: number): Observable<Leader> {
        const localUrl = baseURL + "leaders/" + id;
        console.log("get leader: ", localUrl);
        return this.http.get<Leader>(baseURL + "leaders/" + id).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedLeader(): Observable<Leader> {
        return this.http
            .get<Leader[]>(baseURL + "leadership?featured=true")
            .pipe(map((leaders) => leaders[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
