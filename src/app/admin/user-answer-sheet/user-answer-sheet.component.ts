import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-user-answer-sheet',
  templateUrl: './user-answer-sheet.component.html',
  styleUrls: ['./user-answer-sheet.component.css']
})
export class UserAnswerSheetComponent implements OnInit{

  constructor(private router:Router,private activatedRouter:ActivatedRoute,private adminService:AdminService){}

  answerSheet:any;
  testId:any;
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      if (params['testId'] ) {
        console.log("testId : "+params['testId'] );
        this.testId=params['testId'] ;
        this.getAnswerSheet(this.testId);

        

      }
    })
  }

  getAnswerSheet(id:any){
    this.adminService.getAnswerSheet(id).subscribe((data:any)=>{
      this.answerSheet=data.body;
      console.log("answer Sheet : "+this.answerSheet);
    })
  }

  formatDateTime(dateTimeString: any) {
    const dateTime = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = dateTime.toLocaleDateString('en-GB', options);
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} :: ${formattedTime}`;
  }
  
  
}
