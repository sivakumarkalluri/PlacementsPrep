import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private router:Router) { }
  ngOnInit(): void {
      
  }
  currentUser:BehaviorSubject<any>=new BehaviorSubject(null);
  jwtHelperService=new JwtHelperService();
  
  roleCheck="";
  userInfo:any;
  loggedIn=false;
  accessToken!:string;
  baseUrl="https://app-examportal.azurewebsites.net/api/UserData";
  registerUser(data:Array<String>){
    return this.http.post(this.baseUrl,{
     FirstName:data[0],
     LastName:data[1],
     Email:data[2],
     Mobile:data[3],
     Password:data[4],
     Gender:data[5],
     Role:data[6],
     ImagePath:data[7]
    },{
      responseType:'text'
    });
  }

  loginUser(loginData:Array<String>){
    return this.http.post(this.baseUrl+"/LoginUser",{
      Email:loginData[0],
      Password:loginData[1],
      Role:""
    },{
      responseType:'text'
    }
    )
  }
  setToken(token:string){
    this.loggedIn=true;
    localStorage.setItem("access_token",token);
    this.accessToken=token;
    this.loadCurrentUser();
  }

  

  loadCurrentUser(){
    const token=localStorage.getItem("access_token");
    if(token==null){
      return "none";
    }
    
    const userInfo=token !=null ? this.jwtHelperService.decodeToken(token):null;
   
    this.roleCheck=userInfo.role;
    console.log("roleCheck : "+this.roleCheck);
    const data=userInfo ?{
      id:userInfo.id,
      firstName:userInfo.firstName,
      lastName:userInfo.lastName,
      email:userInfo.email,
      mobile:userInfo.mobile,
      role:userInfo.role,

    }:null;
    this.userInfo=data;
    
    this.currentUser.next(data);
    return userInfo.role;
  }

  removeToken(){
    localStorage.removeItem("access_token");
    this.loggedIn=false;
    
  }
}