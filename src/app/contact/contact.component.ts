import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { expand, flyInOut, visibility } from "../animations/app.animations";
import { FeedbackService } from "../services/feedback.service";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
    animations: [visibility(), flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
    @ViewChild("fform") feedbackFormDirective;
    spinnerVisibility = "hidden";
    responseVisibility = "hidden";
    formVisibility = "shown";
    feedbackForm: FormGroup;
    feedback: Feedback;
    feedbackResponse: Feedback;
    contactType = ContactType;
    errMess: string;
    formErrors = {
        firstname: "",
        lastname: "",
        telnum: "",
        email: "",
    };

    validationMessages = {
        firstname: {
            required: "First Name is required.",
            minlength: "First Name must be at least 2 characters long.",
            maxlength: "FirstName cannot be more than 25 characters long.",
        },
        lastname: {
            required: "Last Name is required.",
            minlength: "Last Name must be at least 2 characters long.",
            maxlength: "Last Name cannot be more than 25 characters long.",
        },
        telnum: {
            required: "Tel. number is required.",
            pattern: "Tel. number must contain only numbers.",
        },
        email: {
            required: "Email is required.",
            email: "Email not in valid format.",
        },
    };

    constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
        this.createForm();
    }

    ngOnInit() {}

    createForm(): void {
        this.feedbackForm = this.fb.group({
            firstname: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            lastname: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            telnum: ["", [Validators.required, Validators.pattern]],
            email: ["", [Validators.required, Validators.email]],
            agree: false,
            contacttype: "None",
            message: "",
        });
        this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    }

    setFeedback(): Promise<Feedback> {
        const feedbackResponse = this.feedback;
        console.log("inside setFeeback");
        return new Promise((resolve) => {
            setTimeout(() => resolve(feedbackResponse), 5000);
        });
    }

    hideFeedbackReponse() {
        console.log("hideFeedbackResponse");
        this.feedbackResponse = null;
        this.formVisibility = "shown";
    }

    onSubmit() {
        this.feedback = this.feedbackForm.value;
        console.log(this.feedback);
        this.formVisibility = "hidden";
        this.spinnerVisibility = "shown";
        this.feedbackService.submitFeedback(this.feedback).subscribe(
            (feedback) => {
                this.spinnerVisibility = "hidden";
                this.feedbackResponse = feedback;
                this.setFeedback().then((feedbackResponse) => this.hideFeedbackReponse());
                console.log("done feedback");
            },
            (errmess) => {
                this.feedback = null;
                this.errMess = errmess as any;
            }
        );

        this.feedbackForm.reset({
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
            agree: false,
            contacttype: "None",
            message: "",
        });
        this.feedbackFormDirective.resetForm();
    }

    onValueChanged(data?: any) {
        if (!this.feedbackForm) {
            return;
        }
        const form = this.feedbackForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = "";
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + " ";
                        }
                    }
                }
            }
        }
    }
}
