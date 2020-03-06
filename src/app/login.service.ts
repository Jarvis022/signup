import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url='http://localhost:3000/login';
  constructor(private _http: HttpClient){}
    register(obj:{}):Observable<any>{
      return this._http.post(this._url,obj);
    }
}
