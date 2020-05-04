import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { Observable } from "rxjs";
import { baseURL } from "../shared/baseURL";
import { catchError, delay } from "rxjs/operators";
import { Feedback } from "../shared/feedback";

@Injectable({
    providedIn: "root",
})
export class FeedbackService {
    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) {}
    submitFeedback(feedback: Feedback): Observable<Feedback> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };
        return this.http
            .post<Feedback>(baseURL + "feedback/", feedback, httpOptions)
            .pipe(delay(100))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
