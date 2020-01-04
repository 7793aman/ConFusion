import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback'
import {flyInOut,expand} from '../animations/app.animation'
import {FeedbackService} from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedBackForm: FormGroup
  contactTypes:string[]=ContactType;
  feedBack:Feedback;
  showSpinner:boolean=false;
  formSubmitted:boolean=false;
  toastMessage=false;
  toastData={}
  errMsg: string;
  @ViewChild('fform') feedbackFormDirective;


  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  }

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  

  constructor(private formBuilder: FormBuilder,@Inject('BaseURL') private baseURL,private feebackService:FeedbackService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.feedBackForm = this.formBuilder.group(
      {
        firstname: ["",[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
        lastname:  ["",[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
        telnum:  ["0",[Validators.required,Validators.pattern]],
        email:  ["",[Validators.required,Validators.email]],
        agree: false,
        contacttype: 'None',
        message:''
      }
    );

    this.feedBackForm.valueChanges.subscribe((data)=>
        this.onValueChanged(data)// reset form validation messages;
    );
  }
  onValueChanged(data?: any) {
    if (!this.feedBackForm) { return; }
    const form = this.feedBackForm;
    for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            
          }
        }
      
    }
  }

  onSubmit(){
    this.formSubmitted=true;
    this.feedBack=this.feedBackForm.value;
    //handling spinner;
    this.showSpinner=true;

    this.feebackService.submitFeedback(this.feedBack).subscribe(
      (value)=>{
      
        this.toastData=value;
        this.toastMessage=true;
        this.showSpinner=false;
       
        setTimeout(()=>{
          this.toastMessage=false;
          this.formSubmitted=false;
        },5000)
        
      },
      (error)=>this.errMsg=error)
    console.log(this.feedBack);
   
        
    this.feedbackFormDirective.resetForm();
  }

}
