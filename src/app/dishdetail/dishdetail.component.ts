import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl'
import { error } from 'protractor';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility',[
      state('shown',style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden',style({
        opacity: 0
      })),
      transition('*=>*',animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  //@Input()

  dish: Dish;
  dishCopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  initialValue: number
  errMsg: string;
  visibility='shown'

  formErrors = {
    'name': '',
    'comment': ''
  }

  validationMessages = {
    'name': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
  }
  commentForm: FormGroup;
  @ViewChild('cform') commentFormDirective;

  constructor(private dishService: DishService,
    private location: Location, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private datePipe: DatePipe,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.initialValue = 5
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds, error => {
      this.errMsg = error
    })

    this.route.params.pipe(switchMap((params: Params) =>
     { 
       this.visibility='hidden';
       return this.dishService.getDish(params['id'])
      }))
      .subscribe((dish) => {
      this.dish = dish;
      this.dishCopy = dish;
      this.setPrevNext(dish.id),
      this.visibility='shown'
    }, error => {
      this.errMsg = error
    })
    this.createForm();

  }

  createForm() {

    this.commentForm = this.formBuilder.group({
      author: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: "5",
      comment: ["", [Validators.required]]
    })
    this.commentForm.valueChanges.subscribe((data) => this.onValueChange(data));
  }

  onValueChange(data: any) {

    if (!this.commentForm) { return };
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const formField = form.get(field);
      if (formField && formField.dirty && !formField.valid) {
        const messages = this.validationMessages[field];
        for (const key in formField.errors) {
          this.formErrors[field] += messages[key] + '  ';
        }
      }
    }

  }

  setPrevNext(dishId: string) {

    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }
  goBack(): void {

    this.location.back();

  }

  onSubmit() {
    var formValues = this.commentForm.value;
    formValues['date'] = this.datePipe.transform(new Date(), "MMM d, y");
    this.dishCopy.comments.push(formValues);
    this.dishService.putDish(this.dishCopy).subscribe(dish => {
      this.dish = dish;
      this.dishCopy = dish;
    }, error => {
      this.dish = null;
      this.dishCopy = null;
      this.errMsg = error
    })
    this.commentFormDirective.resetForm();
    this.commentForm.get('rating').setValue(5);
  }


}
