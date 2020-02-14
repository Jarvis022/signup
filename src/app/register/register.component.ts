import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNull } from 'util';
import { JsonPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  show: boolean;
  pass:string;
  isSubmitted=false;
  countries = [{'id':1, 'name':'India'}, {'id':2, 'name': 'USA'}, {'id':3, 'name': 'UK'}];
  constructor(private fb: FormBuilder) { 

    this.show=false;
  }

  ngOnInit() {
    this.profileForm 
    = this.fb.group({
      Name: ['Pawan ', Validators.minLength(1)],
      userName: ['JArvis117',Validators.minLength(1)],
      email: ['pawan161@gmail.com',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['123456789',[Validators.minLength(8), Validators.required]],
      confirmP: ['12345678',Validators.required],
      Gender:['',Validators.minLength(1)],
      Country:['',Validators.minLength(1)],
      mobileN: ['9893443003',[Validators.required,Validators.pattern("^[7-9][0-9]{9}$")]]
    },{validator:this.matchingPasswords('Password', 'confirmP')});
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('Submit');
    console.warn(this.profileForm.value);
  }
  password(){
    this.show=!this.show;
  }
 matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
  
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}
