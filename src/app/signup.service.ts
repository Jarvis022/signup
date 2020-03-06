import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  _url='http://localhost:3000/posts';
  constructor(private _http: HttpClient){}
    register(obj:{}):Observable<any>{
      return this._http.post(this._url,obj);
    }
}
