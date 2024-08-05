import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';  
import { Injectable } from '@angular/core';
import { from,Observable } from 'rxjs';
import { Ilogin, User } from '../data';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  Url : any;  
  token : any;  
  header : any;
constructor(private http : HttpClient) {   

  this.Url = 'http://localhost:8080/';  

  const headerSettings: {[name: string]: string | string[]; } = {};  
  this.header = new HttpHeaders(headerSettings);  
}  
 CreateUser(register:User)  
 {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept':'application/json' }) };  
  return this.http.post<User[]>(this.Url + 'users', register, httpOptions)  
 }  
}
