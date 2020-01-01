import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder,) { 
    
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.feedBackForm = this.formBuilder.group(
      {
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message:''
      }
    )
  }

  onSubmit(){
    this.feedBack=this.feedBackForm.value;
    console.log(this.feedBack);
    this.feedBackForm.reset();
  }

}
