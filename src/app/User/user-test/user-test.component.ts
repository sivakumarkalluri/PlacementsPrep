import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';

import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.css']
})
export class UserTestComponent implements OnInit{

  constructor(private userService:UserService,private router:Router,private activatedRouter:ActivatedRoute,
    private locationSt: LocationStrategy, private formBuilder: FormBuilder,private authService:AuthenticationService){}

  examId:any;
  examData:any;
  examDuration:any;
  questions:any;
  marksObtained=0;
  questionNumber=0;
  correctAnswers=0;
  wrongAnswers=0;
  percentageObtained=0;
  passOrFail="";
  attempted=0;
  notAttempted=0;
  totalQuestions=0;
  isSubmit = false; //This is used to remove the background when notification is displayed

  userId:any;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 1;
  timer:any;

   p=0
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['examId'] ) {
        console.log("examId : "+params['examId'] );
        this.examId=params['examId'] ;
        this.authService.loadCurrentUser();
        this.getExamData();

        this.userId=this.authService.userInfo.id;
        this.getQuestionsData();
        this.attemptedCheck();
        this.preventBackButton();
      

      }
    })

      
  }


  

  getQuestionsData(){
    this.userService.getExamQuestions(this.examId).subscribe((data:any)=>{
      this.questions=data.body;
      console.log("Question Data : "+this.questions);
      var i=1;
      this.questions.forEach((q:any)=>{
        q['selectedAnswer']="";
        q['qNum']=i++;
        q['userId']=this.userId;
      })
      
    })
  }

  getExamData(){
    this.userService.getExamDataById(this.examId).subscribe((data:any)=>{
      this.examData=data.body;
      this.examDuration=this.examData.examDuration;
      if(this.examDuration){
        this.timer=this.examDuration*60;
        this.starttimer();
      }
      this.totalQuestions=this.examData.examTotalQuestion;
      this.notAttempted=this.totalQuestions;
    })

  }
  
  


  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href)
    });
  }



  getformattedtime() {
    if(this.examDuration && this.timer){
      let mm = Math.floor(this.timer / 60);
      console.log("mms + "+mm);
      let ss = this.timer - mm * 60;
      return `${mm} min : ${ss} sec`;
    }
    return "";
    // let mm = Math.floor(this.timer / 60);
   
  }

  evalExam(){
    this.questions.forEach((q:any)=>{
      if(q.selectedAnswer==q.correctAnswer){
        this.correctAnswers++;
        this.marksObtained+=this.examData.questionMark;
        
      }
      if(q.selectedAnswer!=q.correctAnswer && q.selectedAnswer!=""){
        this.wrongAnswers++;
      }
     })
     this.percentageObtained=((this.marksObtained)/(this.examData.examTotalQuestion*this.examData.questionMark))*100
     if(this.percentageObtained>=this.examData.examPassPercent){
      this.passOrFail="Pass";
     }
     else{
      this.passOrFail="Fail";
     }
     console.log("Answer sheet : "+this.questions);

     console.log("marksGot :  "+this.marksObtained);
     console.log("attempted : "+this.attempted);
     console.log("notAttempted : "+this.notAttempted);
     console.log("correctAnswers : "+this.correctAnswers);
     console.log("wrong Answers : "+this.wrongAnswers);
     console.log("PercentageObtained : "+this.percentageObtained);
     console.log("pass Or fail : "+this.passOrFail);
     this.isSubmit=true;

    //this.isSubmit = true;
  
 
}

  

  
  submitExam() {


    Swal.fire({
      title: 'Do you want to submit the Quiz',
      // html: "Question Attended:" + this.attempted + "/" + this.questions.length,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: 'cancel',
      icon: 'info',
    }).then((e: any) => {
      if (e.isConfirmed) {
        this.evalExam();
        this.postExamData();

      }})
    }
  



  printPage() {
    window.print();
  }

  starttimer() {
      let t = window.setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(t);
          this.evalExam();
          this.postExamData();


        } else {
          this.timer--;
        }
      }, 1000);
    }


    
    postExamData(){


    const inputData = this.questions.map((question:any) => {
      return {
        "user_id": parseInt(question.userId), // Set the user ID
        "exam_id": question.exam_id,
        "category_id": question.category_id,
        "question_id": question.question_id,
        "answer": question.selectedAnswer != null ? parseInt(question.selectedAnswer) : null
      };
    });
  
    // Create the request payload
    const requestPayload = {
      "inputData": inputData
    };
    console.log(requestPayload);

    this.userService.postUserResults(requestPayload).subscribe(
      response => {
        // Handle the success response
        console.log('Data sent successfully', response);
      },
      error => {
        // Handle the error
        console.error('Error sending data', error);
      }
    );
  }

  attemptedCheck() {
    this.attempted = this.questions.filter((q:any) => q.selectedAnswer !== '').length;
    this.notAttempted = this.totalQuestions - this.attempted;
  }
  
  


}


