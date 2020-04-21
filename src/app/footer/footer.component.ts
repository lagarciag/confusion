import { Component, OnInit } from "@angular/core";
import { faHome, faInfo, faList } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
    faHome = faHome;
    faInfo = faInfo;
    faList = faList;

    constructor() {}

    ngOnInit(): void {}
}
