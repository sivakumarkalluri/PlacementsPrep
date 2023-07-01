import { DialogsService } from './../../Services/Dialogs/dialogs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';

import { AdminService } from 'src/app/Services/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../Dialogs/save-dialog/save-dialog.component';
import { ToastrService} from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  questions: any[] = []; // Array to store the questions
  currentQuestionIndex = 0; // Index of the currently displayed question
  formValues: any[] = []; // Array to store the form values
  currentQuestionForm!: FormGroup;
  submitted = false;
  totalQuestion:any;
  currentIndex=0;
  AddExamCheck=false;
  categoryId:any;
  categoryDesc:any;
  editCategory=false;
  categoryName:any;
  editExam=false;
  editExamData:any;
  editExamId:any;
  editFlag=false;
  addQuestionExamId:any;
  addQuestionCategoryId:any;
  addQuestionFlag=false;
  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(private formBuilder: FormBuilder,private adminService:AdminService,
    private dialogService:DialogsService,private toastr: ToastrService,private router:Router,private activatedRouter:ActivatedRoute) {
    this.addCategoryForm.controls['categoryName'].valueChanges.subscribe(value => {
      this.addExamForm.patchValue({ categoryName: value });
    });
  }
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['categoryId'] && params['editFlag']!=1 && params['editCategoryFlag']!=1) {
        console.log("step1");
       this.categoryId=params['categoryId'];
       this.AddExamCheck=true;
       this.categoryName=params['categoryName'];
       this.categoryDesc=params['categoryDesc'];
       console.log(params['categoryDesc']);
        this.currentIndex=1; // Move to the second step
        this.addExamForm.patchValue({
          categoryName: params['categoryName']
        });
        this.addCategoryForm = new FormGroup({
          categoryName: new FormControl({ value: params['categoryName'], disabled: true }),
          categoryDesc: new FormControl({ value: params['categoryDesc'], disabled: true })
        });
       
      }
      else if (params['categoryId'] && params['editCategoryFlag']==1){
        console.log("yes");
        this.editCategory=true;
        this.editFlag=true;
        this.categoryId=params['categoryId'];
        this.addCategoryForm.patchValue({
          categoryName: params['categoryName'],
          categoryDesc:  params['categoryDesc'] 
        });
      }
        else if(params['exam_Id'] && params['editExamFlag']==1){
          this.editExam=true;
          this.editFlag=true;
          
          this.editExamId=params['exam_Id'];
          this.getExamData(this.editExamId);
          console.log(this.editExamData);
          
        }
        else if(params['exam_Id'] && params['AddQuestionFlag']==1){
          console.log("yes");
          this.totalQuestion=1;
          this.addQuestionFlag=true;
          this.editFlag=true;
          this.createQuestions(this.totalQuestion);
      this.createForm();
          this.addQuestionExamId=params['exam_Id'];
          this.addQuestionCategoryId=params['category_Id'];

        }

      
    });

    this.addExamForm.controls["examTotalQuestion"].valueChanges.subscribe(value => {
      this.totalQuestion = value;
      this.createQuestions(this.totalQuestion);
      this.createForm();
      console.log(this.totalQuestion);
    });
   
  }


  
  saveExam(){
    const data={
      examId: this.editExamId,
      category_Id: this.editExamData.category_Id,
      examName: this.addExamForm.value.examName,
      examDescription: this.addExamForm.value.examDesc,
      examDuration: this.addExamForm.value.examDuration,
      questionMark: this.addExamForm.value.questionMark,
      examTotalQuestion: this.addExamForm.value.examTotalQuestion,
      examPassPercent: this.addExamForm.value.examPassPercent
    };

    this.dialogService.openSubmitDialog('Do you want to submit the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.EditExam(data,data.examId).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Posted Successfully...........");
          this.toastr.success(data.examName+' Exam Edited Successfully !');
        this.router.navigate(['/adminHome/adminEditExams']);
        })
      }})


    

    }
  getExamData(id:any){
    this.adminService.getExamData(id).subscribe((data:any)=>{
      this.editExamData=data.body;
      this.examPatchData();
    })
  }

  saveQuestion(){
    this.onSubmit();
    console.log("formValues: "+this.formValues);
    const data={
      exam_id: this.addQuestionExamId,
      category_id: this.addQuestionCategoryId,
      question_desc: this.formValues[0]["questionDesc"],
      option_1: this.formValues[0]["option1"],
      option_2: this.formValues[0]["option2"],
      option_3: this.formValues[0]["option3"],
      option_4: this.formValues[0]["option4"],
      correctAnswer: this.formValues[0]["correctAnswer"],
   }
   
   console.log("addQuestionData: "+data);
   this.dialogService.openSubmitDialog('Do you want to submit the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.AddQuestion(data).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Posted Successfully...........");
          this.toastr.success("Question Added Successfully !");
        this.router.navigate(['/adminHome/adminEditExams']);
        })
        
      }

    });
    
  }

  examPatchData(){
    if(this.editExamData){
      this.addExamForm.patchValue({
        categoryName: "default",
        examName: this.editExamData.examName,
        examDesc: this.editExamData.examDescription,
        examDuration: this.editExamData.examDuration,
        questionMark: this.editExamData.questionMark,
        examTotalQuestion: this.editExamData.examTotalQuestion,
        examPassPercent: this.editExamData.examPassPercent
      })
    }
  }

  disableFirstStep() {
    return this.currentIndex > 0;
  }

  createQuestions(totalQuestions: number) {
    this.questions = [];
    for (let i = 0; i < totalQuestions; i++) {
      const question = {
        questionDesc: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
      };
      this.questions.push(question);
    }
  }

  get formControls() {
    return this.currentQuestionForm.controls;
  }

  createForm() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.currentQuestionForm = this.formBuilder.group({
      questionDesc: [currentQuestion.questionDescription, Validators.required],
      option1: [currentQuestion.option1, Validators.required],
      option2: [currentQuestion.option2, Validators.required],
      option3: [currentQuestion.option3, Validators.required],
      option4: [currentQuestion.option4, Validators.required],
      correctAnswer: [currentQuestion.answer, Validators.required]
    });

    // Set the form values from the stored array if they exist
    if (this.formValues[this.currentQuestionIndex]) {
      this.currentQuestionForm.patchValue(this.formValues[this.currentQuestionIndex]);
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      // Store the form values before moving to the previous question
      this.formValues[this.currentQuestionIndex] = this.currentQuestionForm.value;

      this.currentQuestionIndex--;
      this.createForm();
    }
  }

  goToNextQuestion() {
    if (this.currentQuestionForm.valid) {
      // Store the form values before moving to the next question
      this.formValues[this.currentQuestionIndex] = this.currentQuestionForm.value;

      this.currentQuestionIndex++;
      if (this.currentQuestionIndex === this.questions.length) {
        // All questions have been answered
        console.log('All questions answered!');
        console.log(this.formValues);
        return;
      }
      this.createForm();
    } else {
      this.submitted = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.currentQuestionForm.valid) {
      // Store the form values before submitting
      this.formValues[this.currentQuestionIndex] = this.currentQuestionForm.value;

      console.log('Form submitted successfully!');
      console.log(this.formValues);
    }
  }

  addCategoryForm = new FormGroup({
    categoryName: new FormControl("", [Validators.required]),
    categoryDesc: new FormControl("", [Validators.required])
  });

  addExamForm = new FormGroup({
    categoryName: new FormControl({ value: this.addCategoryForm.value.categoryName, disabled: true }),
    examName: new FormControl("", [Validators.required]),
    examDesc: new FormControl("", [Validators.required]),
    examDuration: new FormControl("", [Validators.required, Validators.pattern("^[1-9][0-9]*$")]),
    questionMark: new FormControl("", [Validators.required, Validators.min(0)]),
    examTotalQuestion: new FormControl("", [Validators.required, Validators.min(1),Validators.pattern("^[1-9][0-9]*$")]),
    examPassPercent: new FormControl("", [Validators.required, Validators.min(0), Validators.max(100)])
  });

  get Name(): FormControl {
    return this.addCategoryForm.get("categoryName") as FormControl;
  }

  get Desc(): FormControl {
    return this.addCategoryForm.get("categoryDesc") as FormControl;
  }

  get ExamName(): FormControl {
    return this.addExamForm.get("examName") as FormControl;
  }

  get ExamDesc(): FormControl {
    return this.addExamForm.get("examDesc") as FormControl;
  }

  get ExamDur(): FormControl {
    return this.addExamForm.get("examDuration") as FormControl;
  }

  get QueMark(): FormControl {
    return this.addExamForm.get("questionMark") as FormControl;
  }

  get TotalQue(): FormControl {
    return this.addExamForm.get("examTotalQuestion") as FormControl;
  }

  get PassPercent(): FormControl {
    return this.addExamForm.get("examPassPercent") as FormControl;
  }

  get QuesDesc():FormControl{
    return this.currentQuestionForm.get("questionDesc") as FormControl
  }
  get Option1():FormControl{
    return this.currentQuestionForm.get("option1") as FormControl
  }
  get Option2():FormControl{
    return this.currentQuestionForm.get("option2") as FormControl
  }
  get Option3():FormControl{
    return this.currentQuestionForm.get("option3") as FormControl
  }
  get Option4():FormControl{
    return this.currentQuestionForm.get("option4") as FormControl
  }
  get Answer():FormControl{
    return this.currentQuestionForm.get("correctAnswer") as FormControl
  }

  

  finalSubmit(){
    if(this.AddExamCheck){
      this.addExam();
    }
    else{

      
    const categoryData = this.addCategoryForm.value;
    const examData = this.addExamForm.value;
    const questionList = this.formValues; // Assuming formValues is an array
    const categoryName=this.addCategoryForm.value.categoryName;
    const categoryDesc=this.addCategoryForm.value.categoryDesc;
    const examDesc=this.addExamForm.value.examDesc;
    const examName=this.addExamForm.value.examName;
    const examDuration=this.addExamForm.value.examDuration;
    const examTotalQuestion=this.addExamForm.value.examTotalQuestion;
    const questionMark=this.addExamForm.value.questionMark;
    const examPassPercent=this.addExamForm.value.examPassPercent;
    // Combine the data into a single object
    const data = {
     categoryName,
     categoryDesc,
     examDesc,
     examName,
     examDuration,examTotalQuestion,
     questionMark,
     examPassPercent,
      questionList
    };
    console.log(data);
    this.dialogService.openSubmitDialog('Do you want to submit the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.postCategoryExamsQuestions(data).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Posted Successfully...........");
          this.toastr.success('New Category Added Successfully !');
        this.router.navigate(['/adminHome/adminCategories']);
        })
        
      }

    });
    

    }
    
    
  }

  addExam(){
  
    const questionList = this.formValues; // Assuming formValues is an array
    const categoryId=this.categoryId;
    const categoryName=this.addExamForm.value.categoryName;
    const examDesc=this.addExamForm.value.examDesc;
    const examName=this.addExamForm.value.examName;
    const examDuration=this.addExamForm.value.examDuration;
    const examTotalQuestion=this.addExamForm.value.examTotalQuestion;
    const questionMark=this.addExamForm.value.questionMark;
    const examPassPercent=this.addExamForm.value.examPassPercent;
    // Combine the data into a single object
    const data = {
     categoryId,
     examDesc,
     examName,
     examDuration,examTotalQuestion,
     questionMark,
     examPassPercent,
      questionList
    };
    console.log(data);
    console.log("********* Add Exam ***********");
    this.dialogService.openSubmitDialog('Do you want to submit the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.postNewExam(data).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Posted Successfully...........");
          this.toastr.success(examName+' Exam Added in to '+this.categoryName+ ' Category Successfully !');
        this.router.navigate(['/adminHome/adminCategories']);
        })
        
      }

    });
    

  }

  saveCategory(){
   const data={
      categoryId:parseInt(this.categoryId),
      categoryName:this.addCategoryForm.value.categoryName,
      categoryDesc:this.addCategoryForm.value.categoryDesc
    }
    this.categoryId=parseInt(this.categoryId);
    this.adminService.getCategories().subscribe(
      (response: any) => {
       
        console.log(response.body);
      })

    console.log(data);
    console.log("********* Edit Exam ***********");
    this.dialogService.openSubmitDialog('Do you want to submit the changes ?')
    .afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.adminService.editCategory(data,this.categoryId).subscribe((response:any)=>{
          console.log(response.body);
          console.log("Putted Successfully...........");
          this.toastr.success(this.addCategoryForm.value.categoryName+' Category Edited Successfully !');
        this.router.navigate(['/adminHome/adminCategories']);
        })
        
      }

    });
    

  }
 
}
