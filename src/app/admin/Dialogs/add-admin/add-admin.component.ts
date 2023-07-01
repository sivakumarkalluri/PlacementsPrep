import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{

  adminForm!: FormGroup;
  displayMsg="";
  isAccountCreated=false;

  constructor(
    public dialogRef: MatDialogRef<AddAdminComponent>,
    private formBuilder: FormBuilder,private adminService:AdminService,private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      firstName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
      lastName:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
      email:new FormControl("",[Validators.required,Validators.email]),
      mobile:new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
      gender:new FormControl("",[Validators.required]),
      
    });
  }

  saveAdmin():void{
    console.log("yes");
    if (this.adminForm.invalid) {
      console.log(this.adminForm.errors);
      console.log("yessssssssss")
      return;
    }

    this.adminService.AddAdmin([
      this.adminForm.value.firstName as String,
      this.adminForm.value.lastName as String,
      this.adminForm.value.email as String,
      this.adminForm.value.mobile as String,
      "dup",
      this.adminForm.value.gender as String,
      "dup",
      "null"
    ]).subscribe((res:any)=>{

      if(res=="Success"){
        this.toastr.success("Account Created Successfully");
        this.dialogRef.close();

        setTimeout(() => {
          this.isAccountCreated = true;
          
        }, 1000);
       
        this.displayMsg="Account Created Successfully";

        
      
       
        
      
      }
      else if(res=="Already Exist"){
        this.displayMsg="Account Already Exist. Try another Email";
        this.isAccountCreated=false;
      }
      else{
        this.displayMsg="Something went Wrong";
        this.isAccountCreated=false;
      }

    })
  }

  get FirstName():FormControl{
    return this.adminForm.get("firstName") as FormControl;
  }
  get LastName():FormControl{
    return this.adminForm.get("lastName") as FormControl;
  }
  get Email():FormControl{
    return this.adminForm.get("email") as FormControl;
  }
  get Gender():FormControl{
    return this.adminForm.get("gender") as FormControl;
  }
  
  get Mobile():FormControl{
    return this.adminForm.get("mobile") as FormControl;
  }

 

  closeModal(): void {
    this.dialogRef.close();
  }

}
