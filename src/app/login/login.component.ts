import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNull } from 'util';
import { JsonPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material';
import { LoginService } from '../login.service';
//import { SignupService } from '../signup.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  show : boolean;
  loginup : boolean;
  failed : boolean;
  nouser : boolean;
  obj={};

  constructor(private fb: FormBuilder,private _registrationService:LoginService) { 
    this.show=false;
  }

  ngOnInit() {
    this.loginForm 
    = this.fb.group({
      userName: ['', Validators.minLength(1)],
      Password: ['',[Validators.minLength(8), Validators.required]],
    });
    
  }
  onSubmit() {
    this.obj['userName']=this.loginForm.controls['userName'].value;
    this.obj['Password']=this.loginForm.controls['Password'].value;
    this._registrationService.register(this.obj)
    .subscribe(response=>{
      //console.log('Success!',response)
      if(response.message==="nouser"){
        this.nouser=true;
      }
      else if(response.message==="incorrect"){
        this.failed=true
      }
      else if(response.message==="success"){
        this.loginup=true;
        console.log("Working");
      } 
  })
  }
  password(){
    
    this.show=!this.show;
  
  }
}
