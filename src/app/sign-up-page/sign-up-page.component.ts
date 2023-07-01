import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../Services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit{

  constructor(private authService:AuthenticationService,private router:Router,private toastr:ToastrService){}
  repeatPass:string='none';
  displayMsg="";
  isAccountCreated=false;
  userData:any;
  ngOnInit(): void {
      
  }
  registerForm=new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    lastName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    email:new FormControl("",[Validators.required,Validators.email]),
    mobile:new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
    gender:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd:new FormControl("")
    
  
  });

  registerSubmit(){
    if(this.Pwd.value==this.RPwd.value && this.registerForm.value.gender!=""){
      console.log("submitted");
      this.repeatPass = 'none';
    console.log(this.registerForm.value);
    
    this.authService.registerUser([
      this.registerForm.value.firstName as String,
      this.registerForm.value.lastName as String,
      this.registerForm.value.email as String,
      this.registerForm.value.mobile as String,
      this.registerForm.value.password as String,
      this.registerForm.value.gender as String,
      "User",
      ""
    ]).subscribe((res:any)=>{

      if(res=="Success"){
        this.toastr.success("Account Created Successfully");
        setTimeout(() => {
          this.isAccountCreated = true;
          
        }, 1000);
        this.loginSubmit();
        this.displayMsg="Account Created Successfully";
        
      
       
        
      
      }
      else if(res=="Already Exist"){
        this.displayMsg="Account Already Exist. Try another Email or Please Login";
        this.isAccountCreated=false;
      }
      else{
        this.displayMsg="Something went Wrong";
        this.isAccountCreated=false;
      }

    })
    console.log(this.registerForm);
  }
  else{
    if(this.registerForm.value.gender){

    }
    this.repeatPass='inline';
  }

  }

isUserValid=false;

  loginSubmit(){
    this.authService.loginUser([this.registerForm.value.email as String,this.registerForm.value.password as String]).subscribe(res=>{
      if(res=="failure"){
        this.isUserValid=false;
        this.toastr.error("Log in UnSuccessfull");
      }
      else{
        this.isUserValid=true;
        this.authService.setToken(res);
        if(this.authService.roleCheck=="User"){
          this.router.navigate(['userHome/userExams']);
        }
        else{
          this.router.navigate(['adminHome/adminDashboard']);
        }
      }

    })
  }

  
removeErrorMessage() {
  this.repeatPass = "none";
}

  get FirstName():FormControl{
    return this.registerForm.get("firstName") as FormControl;
  }
  get LastName():FormControl{
    return this.registerForm.get("lastName") as FormControl;
  }
  get Email():FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Gender():FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  
  get Mobile():FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get Pwd():FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get RPwd():FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }

}
function callback(args_0: number): void {
  throw new Error('Function not implemented.');
}

