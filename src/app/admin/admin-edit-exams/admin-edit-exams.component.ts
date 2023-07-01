import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from 'src/app/Services/Dialogs/dialogs.service';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-admin-edit-exams',
  templateUrl: './admin-edit-exams.component.html',
  styleUrls: ['./admin-edit-exams.component.css']
})
export class AdminEditExamsComponent implements OnInit{
  constructor(private adminService:AdminService,private router:Router,private dialogService:DialogsService,private toastr:ToastrService){}
  examData:any;
  ngOnInit(): void {
      this.getCRUDExamData();
  }
  getCRUDExamData(){
    this.adminService.getCRUDExamData().subscribe((data:any)=>{
      this.examData=data.body;
      console.log(this.examData);
      this.processData(this.examData);
    })
  }
  
    transformedData!: any[];
  
    // Assuming you have the response data stored in a variable called 'responseData'
    processData(responseData: any[]) {
      const transformedData: any[] = [];
  
      const categoryMap: { [key: string]: any } = {};
  
      responseData.forEach((item: any) => {
        const categoryName = item.category_Name;
        const exam = {
          exam_Id: item.exam_Id,
          exam_Name: item.exam_Name,
          exam_totalquestion: item.exam_totalquestion,
          total_Exams: item.total_Exams,
        };
  
        if (categoryMap.hasOwnProperty(categoryName)) {
          categoryMap[categoryName].exams.push(exam);
        } else {
          categoryMap[categoryName] = {
            category_Name: categoryName,
            exams: [exam],
          };
        }
      });
  
      for (const key in categoryMap) {
        if (categoryMap.hasOwnProperty(key)) {
          transformedData.push(categoryMap[key]);
        }
      }
  
      this.transformedData = transformedData;
      console.log(this.transformedData);
    }
  
    
    ViewQuestions(exam_Id:any,exam_Name:any){
        this.router.navigate(['/adminHome/ViewQuestions'], { queryParams: { exam_Id: exam_Id,exam_Name:exam_Name, editFlag:1 }})
    }
    EditExam(exam_Id:any){
      this.router.navigate(['/adminHome/addCategory'], { queryParams: { exam_Id:exam_Id , editExamFlag:1 }})

    }

    AddQuestion(id:any,categoryId:any){
      this.router.navigate(['/adminHome/addCategory'], { queryParams: { exam_Id:id ,category_Id:categoryId, AddQuestionFlag:1 }})

    }
    DeleteExam(id:any,examName:any){

      console.log("dialog opened");
      this.dialogService.openDeleteDialog("Do you want to delete the "+ examName+"? \n All the related data will be deleted.").afterClosed().subscribe((res: any) => {
        if (res === true) {
          this.adminService.deleteExam(id).subscribe((response: any) => {
            if (response.body.exam_Id === id) {
              this.getCRUDExamData();
              this.toastr.success(examName + " Exam Deleted Successfully");
              
            } else {
              console.log(response.categoryID);
              
              this.toastr.error("An error occurred while deleting the Exam.");
            }
          }, (error: any) => {
            console.log(error);
            this.toastr.error("An error occurred while deleting the Exam.");
          });
        }
      });

    }
  


}
