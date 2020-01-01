import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedBackForm: FormGroup
  contactTypes:string[]=ContactType;
  feedBack:Feedback;

  @ViewChild('fform') feedbackFormDirective;
  constructor(private formBuilder: FormBuilder,) { 
    
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.feedBackForm = this.formBuilder.group(
      {
        firstname: ["",Validators.required],
        lastname:  ["",Validators.required],
        telnum:  ["0",Validators.required],
        email:  ["",Validators.required],
        agree: false,
        contacttype: 'None',
        message:''
      }
    )
  }

  onSubmit(){
    this.feedBack=this.feedBackForm.value;
    console.log(this.feedBack);
    // this.feedBackForm.reset({
    //   firstname:"",
    //     lastname:  "",
    //     telnum:0,
    //     email: "",
    //     agree: false,
    //     contacttype: 'None',
    //     message:''
    // });
    this.feedbackFormDirective.resetForm();
  }

}
