import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-exam-instructions',
  templateUrl: './exam-instructions.component.html',
  styleUrls: ['./exam-instructions.component.css']
})
export class ExamInstructionsComponent implements OnInit{

  constructor(private userService:UserService,private activatedRouter:ActivatedRoute,private router:Router){}
  examId:any;
  examData:any;
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['examId'] ) {
        console.log("examId : "+params['examId'] );
        this.examId=params['examId'] ;
        this.getExamData();

      }
    })
  }

  startExam(){
    Swal.fire({
      title: 'Do you want to start the Exam?',
      
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result : any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/userTest'],{ queryParams: { examId:this.examId } })      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  getExamData(){
    if(this.examId){
      this.userService.getExamDataById(this.examId).subscribe((data:any)=>{
        this.examData=data.body;
        console.log("Exam Data : "+this.examData);
      })
    }
  }
  

  

}
