import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback } from "../shared/feedback";
import { DishComment } from "../shared/dishComment";

@Component({
    selector: "app-dishdetail",
    templateUrl: "./dishdetail.component.html",
    styleUrls: ["./dishdetail.component.css"],
})
export class DishdetailComponent implements OnInit {
    @ViewChild("fform") commentFormDirective;
    dishIds: string[];
    prev: string;
    next: string;
    errMess: string;
    dishcopy: Dish;
    dish: Dish;
    previewOn = false;
    commentForm: FormGroup;
    comment: Comment;
    submitDisabled = true;

    dishComment = {
        author: "",
        comment: "",
        rating: 5,
        date: "",
    };

    formErrors = {
        author: "",
        comment: "",
        rating: "",
    };

    formFieldIsSet = {
        author: false,
        comment: false,
        rating: false,
    };

    validationMessages = {
        author: {
            required: "Name is required.",
            minlength: "Name must be at least 2 characters long.",
            maxlength: "Name cannot be more than 25 characters long.",
        },

        comment: {
            required: "A comment is required.",
            minlength: "The comment must be at least 2 characters long.",
            maxlength: "The comment cannot be more than 25 characters long.",
        },
    };

    constructor(
        private fb: FormBuilder,
        private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject("BASE_URL") public baseURL
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.dishService.getDishIds().subscribe(
            (dishIds) => (this.dishIds = dishIds),
            (errmess) => (this.errMess = errmess as any)
        );

        this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params["id"]))).subscribe(
            (dish) => {
                this.dish = dish;
                this.dishcopy = dish;
                this.setPrevNext(dish.id);
            },
            (errmess) => (this.errMess = errmess as any)
        );
    }

    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    createForm(): void {
        this.commentForm = this.fb.group({
            author: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            comment: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: [5],
        });
        this.commentForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    }

    onSubmit() {
        this.previewOn = false;
        this.dishComment.date = new Date().toISOString();

        this.comment = this.commentForm.value;
        console.log(this.comment);

        this.dishcopy.comments.push(this.dishComment);
        this.dishService.putDish(this.dishcopy).subscribe(
            (dish) => {
                this.dish = dish;
                this.dishcopy = dish;
            },
            (errmess) => {
                this.dish = null;
                this.dishcopy = null;
                this.errMess = errmess as any;
            }
        );

        this.commentForm.reset({
            rating: 5,
            comment: "",
            author: "",
            date: "",
        });
        this.commentFormDirective.resetForm();
    }

    goBack(): void {
        this.location.back();
    }

    onValueChanged(data?: any) {
        if (!this.commentForm) {
            return;
        }
        this.previewOn = true;
        const form = this.commentForm;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = "";
                this.formFieldIsSet[field] = false;
                // this.dishComment[field] = "";

                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + " ";
                        }
                    }
                    this.formFieldIsSet[field] = false;
                } else if (control && control.dirty && control.valid) {
                    this.formFieldIsSet[field] = true;
                    this.dishComment[field] = control.value;
                    console.log(this.dishComment);
                }
            }
        }
        if (this.formFieldIsSet.author && this.formFieldIsSet.comment) {
            this.submitDisabled = false;
            console.log("submit button is enabled");
        } else {
            this.submitDisabled = true;
            console.log("submit button is disabled");
        }
    }
}
