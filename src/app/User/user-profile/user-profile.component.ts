import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{


  repeatPass:string='none';
  displayMsg="";
  samePassword='none';
  

  constructor(private authService: AuthenticationService,private adminService:AdminService,
    private toastr:ToastrService,private router:Router) {
    
  }

  showPasswordFields = false;
  newPassword: string = '';
  confirmPassword: string = '';
  password:string='';
  wrongPassword='none'
  userId:any;
  edit=false;
  userData:any;
  imagePath:any;
  isEditMode: boolean = true;

  

  ngOnInit(){
   
    console.log("yes"+this.userId);
    this.getUserData();
    
  }
  
  
  cancel() {
    this.isEditMode = true;
    this.showPasswordFields = false;
    
  }
  
  showChangePasswordFields() {
    this.isEditMode = false;
    this.showPasswordFields = true;
    this.edit = false;
  }
  editButton(){
     this.isEditMode=false;
     this.edit=!this.edit;
     
    if(this.edit){
    this.editForm.get('firstName')?.enable();
    this.editForm.get('lastName')?.enable();
    this.editForm.get('email')?.enable();

    this.editForm.get('gender')?.enable();

    this.editForm.get('mobile')?.enable();
    }
    else{
      this.editForm.get('firstName')?.disable();
      this.editForm.get('lastName')?.disable();
      this.editForm.get('email')?.disable();
  
      this.editForm.get('gender')?.disable();
  
      this.editForm.get('mobile')?.disable();
    }

  }
  

  editForm = new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    lastName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    email:new FormControl("",[Validators.required,Validators.email]),
    mobile:new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
    gender:new FormControl(""),
    imagePath:new FormControl(""),
    password:new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    newPassword:new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    CPwd:new FormControl("")
  });

  editformsubmit(){
    if(this.NPwd.value == this.CPwd.value){
      console.log("submitted");
    }
    else {
      this.repeatPass='inline';
    }
    console.log(this.editForm.value);
  }

  get FirstName():FormControl{
    return this.editForm.get("firstName") as FormControl;
  }
  get LastName():FormControl{
    return this.editForm.get("lastName") as FormControl;
  }
  get Email():FormControl{
    return this.editForm.get("email") as FormControl;
  }
  get Gender():FormControl{
    return this.editForm.get("gender") as FormControl;
  }
  
  get Mobile():FormControl{
    return this.editForm.get("mobile") as FormControl;
  }
  get Pwd():FormControl{
    return this.editForm.get("password") as FormControl;
  }
  get NPwd():FormControl{
    return this.editForm.get("newPassword") as FormControl;
  }
  get CPwd():FormControl{
    return this.editForm.get("CPwd") as FormControl;
  }

  


  getUserData(){
    this.authService.loadCurrentUser();
    this.userId=this.authService.userInfo.id;
    console.log("user"+this.userId);
    if(this.userId){
      console.log("userId"+this.userId);
    this.adminService.getUserData(this.userId).subscribe((data:any)=>{
      console.log(data.body);
      this.userData=data.body;
      console.log("data"+this.userData);
      if(this.userData){
        console.log("yes")
        this.editForm.patchValue({
          firstName:this.userData.firstName,
          lastName:this.userData.lastName,
          mobile:this.userData.mobile,
          gender:this.userData.gender,
          imagePath:this.userData.imagePath,
          password:this.userData.password,
          newPassword:this.userData.password,
          CPwd:this.userData.password,
          email:this.userData.email
        })
      }
    })
    this.editForm.get('firstName')?.disable();
    this.editForm.get('lastName')?.disable();
    this.editForm.get('email')?.disable();

    this.editForm.get('gender')?.disable();

    this.editForm.get('mobile')?.disable();

    
  }
}
removeErrorMessage(){
  this.repeatPass='none';
  this.samePassword='none';
  this.wrongPassword='none'

}
saveData(){
  if(this.showPasswordFields){
  const oldPassword = this.userData.password; // Assuming you have the old password stored in `userData.password`
 this.samePassword='none';
  if (this.NPwd.value === this.CPwd.value && this.NPwd.value !== oldPassword && this.password==oldPassword) {
    console.log("submitted");
    const data={
      userId:parseInt(this.userId),
      firstName:this.userData.firstName,
      lastName:this.userData.lastName,
      gender:this.userData.gender,
      email:this.userData.email,
      role:"",
      imagePath:this.userData.imagePath,
      registeredAt:this.userData.registeredAt,
      password:this.editForm.value.newPassword?.toString(),
      mobile:this.userData.mobile
    }
    console.log("changePassword"+data.firstName);

    this.updateProfile(data);

    
  } 
  else if(this.password!=oldPassword){
    this.wrongPassword='inline';
  }
  else if(this.NPwd.value == oldPassword){
    console.log("same");
    this.samePassword='inline';
  }
  else{
    this.repeatPass = 'inline';
  }
}
else{
  const data={
    userId:parseInt(this.userId),
    firstName:this.editForm.value.firstName,
    lastName:this.editForm.value.lastName,
    gender:this.editForm.value.gender,
    email:this.editForm.value.email,
    role:"",
    imagePath:this.userData.imagePath,
    registeredAt:this.userData.registeredAt,
    password:this.userData.password,
    mobile:this.editForm.value.mobile
  }
  this.updateProfile(data);

 

}
}

updateProfile(data:any){

  this.adminService.updateProfile(data,this.userId).subscribe((data:any)=>{
    if(data.body.userId==this.userId){
      if(this.showPasswordFields){
        this.showPasswordFields=false;
        this.toastr.success('Password Changed Successfully !');

      }
      else{
        this.toastr.success('Profile Updated Successfully !');

      }
      this.isEditMode=true;
     this.edit=false;
     this.editForm.get('firstName')?.disable();
     this.editForm.get('lastName')?.disable();
     this.editForm.get('email')?.disable();
 
     this.editForm.get('gender')?.disable();
 
     this.editForm.get('mobile')?.disable();



    }
    else{
      this.toastr.error('Unable to Update the Profile !');

    }
  })

}

uploadImage(event:any):void{
  if(this.userId){
    const file:File=event.target.files[0];
    this.adminService.uploadImage(this.userId,file).subscribe((successResponse)=>{
      this.userData.imagePath=successResponse;
      this.toastr.success('Profile Image Updated Successfully !');

      console.log(successResponse);
    });
  }
}


}
