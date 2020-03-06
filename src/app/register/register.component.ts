import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNull } from 'util';
import { JsonPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material';
import { SignupService } from '../signup.service';

@Component({

  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})

export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  show: boolean;
  pass:string;
  isSubmitted=false;
  showMsg=false;
  emailReg=false;
  usernameReg=false;
  numberReg=false;
  errorR=false;
  obj={};
  countries = [{'id':1, 'name':'India'}, {'id':2, 'name': 'USA'}, {'id':3, 'name': 'UK'}];
  
  constructor(private fb: FormBuilder,private _registrationService:SignupService) { 

    this.show=false;
  
  }

  ngOnInit() {
    
    this.profileForm 
    = this.fb.group({
      Name: ['Pawan', Validators.minLength(1)],
      userName: ['Jarvis',Validators.minLength(1)],
      email: ['gauravpg786@gmail.com',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['123456789',[Validators.minLength(8), Validators.required]],
      confirmP: ['123456789',Validators.required],
      Gender:['Male',Validators.minLength(1)],
      Country:['India',Validators.minLength(1)],
      mobileN: ['9893443003',[Validators.required,Validators.pattern("^[7-9][0-9]{9}$")]]
    },{validator:this.matchingPasswords('Password', 'confirmP')});
  
  }

  onSubmit() {
    this.emailReg=false;
    this.usernameReg=false;
    this.numberReg=false;
    this.errorR=false;
    this.obj['Name']=this.profileForm.controls['Name'].value;
    this.obj['userName']=this.profileForm.controls['userName'].value;
    this.obj['email']=this.profileForm.controls['email'].value;
    this.obj['Password']=this.profileForm.controls['Password'].value;
    this.obj['mobileN']=this.profileForm.controls['mobileN'].value;
    this.obj['Gender']=this.profileForm.controls['Gender'].value;
    this.obj['Country']=this.profileForm.controls['Country'].value;
    this._registrationService.register(this.obj)
    .subscribe(response=>{console.log('Success!',response)
      if(response.message==="Email"){
        
        this.emailReg=true;
        this.errorR=true;
    
      }
    if(response.message==="Number"){

      this.numberReg=true;
      this.errorR=true;
    
      }
    if(response.message==="Username"){
        
      this.usernameReg=true;
      this.errorR=true;

      }
    if(!this.errorR){
      
      this.showMsg=true;
    
      }
    if(response.message==="success"){
    
      this.profileForm.reset();
    
      }
    
    },
    error=>{
    
      console.log(error);
    
      }); 
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