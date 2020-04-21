import { Component, OnInit } from "@angular/core";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
    faSkype = faSkype;
    faEnvelope = faEnvelopeOpen;
    faPhone = faPhone;
    constructor() {}

    ngOnInit(): void {}
}
