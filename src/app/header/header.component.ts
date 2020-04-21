import { Component, OnInit } from "@angular/core";
import { faHome, faInfo, faList } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    faHome = faHome;
    faInfo = faInfo;
    faList = faList;
    faAddressCard = faAddressCard;
    constructor() {}

    ngOnInit(): void {}
}
