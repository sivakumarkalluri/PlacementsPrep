import { DialogsService } from './../../Services/Dialogs/dialogs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit{

  constructor(private router:Router,private adminService:AdminService,private toastr: ToastrService,private dialogService:DialogsService){}

  categoryData:any;
  categoryName!: string;
  categoryId!: number;
  categoryDesc!:string
  loadingError:any;
  ngOnInit(): void {
      this.getCategoriesData();
  }
  getCategoriesData(){
    this.adminService.getCategories().subscribe(
      (response: any) => {
        this.categoryData = response.body;
        console.log(this.categoryData);
      },
      (error: any) => {
        this.loadingError = true;
        console.log('Unable to fetch the data. Please try again.');
      }
    );
  }
  addCategory(){
    this.router.navigate(['/adminHome/addCategory'])
  }
  deleteCategory(categoryId: any, categoryName: any): void {
    console.log("dialog opened");
    this.dialogService.openDeleteDialog("Do you want to delete the " + categoryName + " Category? \n All the related data will be deleted.").afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.adminService.deleteCategory(categoryId).subscribe((response: any) => {
          if (response.body.categoryId === categoryId) {
            this.getCategoriesData();
            this.toastr.success(categoryName + " Category Deleted Successfully");
            
          } else {
            console.log(response.categoryID);
            
            this.toastr.error("An error occurred while deleting the category.");
          }
        }, (error: any) => {
          console.log(error);
          this.toastr.error("An error occurred while deleting the category.");
        });
      }
    });
  }


  addExam(category: any) {
    this.categoryName = category.categoryName;
    this.categoryId = category.categoryId;
    this.categoryDesc=category.categoryDesc;
    this.router.navigate(['/adminHome/addCategory'], { queryParams: { categoryName: this.categoryName, categoryId: this.categoryId,categoryDesc:this.categoryDesc, step: 1,editFlag:0 } });
  }
  editCategory(categoryId:any,categoryName:any,categoryDesc:any){
   
    this.router.navigate(['/adminHome/addCategory'],{ queryParams: { categoryName: categoryName, categoryId: categoryId,categoryDesc:categoryDesc, editCategoryFlag: 1 } })
  }

  }


