import { Injectable } from "@angular/core";
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { Observable, of } from "rxjs";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { catchError, delay, map } from "rxjs/operators";
import { Dish } from "../shared/dish";
import { baseURL } from "../shared/baseURL";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
    providedIn: "root",
})
export class PromotionService {
    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) {}

    getPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(baseURL + "promotions").pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPromotion(id: number): Observable<Promotion> {
        const localUrl = baseURL + "promotions/" + id;
        console.log("get promotion: ", localUrl);
        return this.http.get<Dish>(baseURL + "promotions/" + id).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedPromotion(): Observable<Promotion> {
        return this.http
            .get<Promotion[]>(baseURL + "promotions?featured=true")
            .pipe(map((promotions) => promotions[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
