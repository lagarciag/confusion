import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseURL";
import { catchError, map } from "rxjs/operators";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
    providedIn: "root",
})
export class DishService {
    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) {}

    getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(baseURL + "dishes").pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getDish(id: number): Observable<Dish> {
        const localUrl = baseURL + "dishes/" + id;
        console.log("get dish: ", localUrl);
        return this.http.get<Dish>(baseURL + "dishes/" + id).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedDish(): Observable<Dish> {
        return this.http
            .get<Dish[]>(baseURL + "dishes?featured=true")
            .pipe(map((dishes) => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getDishIds(): Observable<number[] | any> {
        return this.getDishes()
            .pipe(map((dishes) => dishes.map((dish) => dish.id)))
            .pipe(catchError((error) => error));
    }
    putDish(dish: Dish): Observable<Dish> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };
        return this.http
            .put<Dish>(baseURL + "dishes/" + dish.id, dish, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    // Code implementation using observables converted to observables
    // ------------------------------------------------------------
    // getDishes(): Observable<Dish[]> {
    //     return of(DISHES).pipe(delay(2000));
    // }
    //
    // getDish(id: string): Observable<Dish> {
    //     return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
    // }
    //
    // getFeaturedDish(): Observable<Dish> {
    //     return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    // }
    //
    // getDishIds(): Observable<string[] | any> {
    //     return of(DISHES.map((dish) => dish.id));
    // }

    // Code implementation using observables converted to promises
    // ------------------------------------------------------------
    // getDishes(): Promise<Dish[]> {
    //       return of(DISHES).pipe(delay(2000)).toPromise();
    //   }
    //
    //   getDish(id: string): Promise<Dish> {
    //       return of(DISHES.filter((dish) => dish.id === id)[0])
    //           .pipe(delay(2000))
    //           .toPromise();
    //   }
    //
    //   getFeaturedDish(): Promise<Dish> {
    //       return of(DISHES.filter((dish) => dish.featured)[0])
    //           .pipe(delay(2000))
    //           .toPromise();
    //   }

    // Code implementation using promises only
    // -----------------------------------------
    // getDishes(): Promise<Dish[]> {
    //     return new Promise((resolve) => {
    //         // Simulate server latency with 2 second delay
    //         setTimeout(() => resolve(DISHES), 2000);
    //     });
    // }
    //
    // getDish(id: string): Promise<Dish> {
    //     return new Promise((resolve) => {
    //         // Simulate server latency with 2 second delay
    //         setTimeout(() => resolve(DISHES.filter((dish) => dish.id === id)[0]), 2000);
    //     });
    // }
    //
    // getFeaturedDish(): Promise<Dish> {
    //     return new Promise((resolve) => {
    //         // Simulate server latency with 2 second delay
    //         setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    //     });
    // }
}
