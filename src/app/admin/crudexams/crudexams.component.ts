import { ToastrService } from 'ngx-toastr';
import { DialogsService } from './../../Services/Dialogs/dialogs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/Services/Toaster/toaster.service';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crudexams',
  templateUrl: './crudexams.component.html',
  styleUrls: ['./crudexams.component.css']
})
export class CRUDExamsComponent implements OnInit{

  constructor(private adminService:AdminService,private router:Router,private formBuilder:FormBuilder,
    private activatedRouter:ActivatedRoute,private dialogService:DialogsService,private toastr:ToastrService){}

  viewQuestions=true;
  examId:any;
  examName:any;
  questionsData:any;
  questionForm!: FormGroup;
  ngOnInit(): void {
    this.initQuestionForm();
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['exam_Id'] && params['editFlag']==1) {
        this.viewQuestions=false;
        this.examName=params['exam_Name']
        this.examId=params['exam_Id']
        this.getQuestions();

      }
    })


  }
  sanitizeQuestionDesc(description: string): string {
    return description.replace(/\n/g, '<br>');
  }
  getQuestions(){
    this.adminService.getExamQuestionsById(this.examId).subscribe((data:any)=>{
      this.questionsData=data.body;
      console.log(this.questionsData);
    })
  }

  deleteQuestion(id:any){

    console.log("dialog opened");
    this.dialogService.openDeleteDialog("Do you want to delete this Question ").afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.adminService.deleteQuestion(id).subscribe((response: any) => {
          console.log(response.body);
          if (response.body.question_Id === id) {
            this.getQuestions();
            this.toastr.success(" Question Deleted Successfully");
            
          } else {
            console.log(response.categoryID);
            
            this.toastr.error("An error occurred while deleting the Question.");
          }
        }, (error: any) => {
          console.log(error);
          this.toastr.error("An error occurred while deleting the Question.");
        });
      }
    });
    

  }

  initQuestionForm() {
    this.questionForm = this.formBuilder.group({
      question_desc: ['', Validators.required],
      option_1: ['', Validators.required],
      option_2: ['', Validators.required],
      option_3: ['', Validators.required],
      option_4: ['', Validators.required],
      correctAnswer: ['', Validators.required]
    });
  }

  editQuestion(question: any) {
    // Close all other edit forms
    this.questionsData.forEach((q: any) => {
      if (q.editMode && q !== question) {
        q.editMode = false;
      }
    });
  
    // Set the form values based on the selected question
    this.questionForm.patchValue({
      question_desc: question.question_desc,
      option_1: question.option_1,
      option_2: question.option_2,
      option_3: question.option_3,
      option_4: question.option_4,
      correctAnswer: question.correctAnswer
    });
  
    // Enable the edit mode for the selected question
    question.editMode = true;
  }
  
  saveQuestion(question:any,id:any,index:any){
    const data={
      question_id:id,
      category_id:question.category_id,
      exam_id:question.exam_id,
      question_desc: this.questionForm.value.question_desc,
      option_1: this.questionForm.value.option_1,
      option_2: this.questionForm.value.option_2,
      option_3: this.questionForm.value.option_3,
      option_4: this.questionForm.value.option_4,
      correctAnswer: this.questionForm.value.correctAnswer

    }

    this.dialogService.openSubmitDialog('Do you want to Save the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.editQuestion(data,id).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Putted Successfully...........");
          this.toastr.success('Question '+ index+ ' Edited Successfully !');
          question.editMode = false;
        this.getQuestions();
         
      
        })
        
        
      }

    });
    
  }
}
