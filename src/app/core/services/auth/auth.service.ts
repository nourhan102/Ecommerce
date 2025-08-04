import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient , private  router: Router ) { }

  userData :any;
   

  Signup(data:object):Observable<any>{
    return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data)
  }


  signin(data:object):Observable<any>{
    return  this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
  }

  signOut(){
    localStorage.removeItem('myToken')
    this.userData = null
    this.router.navigate(['/login'])


  }

  getUserData():void{
    
    this.userData = console.log(jwtDecode(localStorage.getItem('myToken') ! ))
    console.log(this.userData);
    
    
    
  }



}
