import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  constructor(private adminService:AdminService,private router:Router){}

  examsData:any;
  examImages:any;

  ngOnInit(): void {
      this.getExamData();;
      this.getExamImages();
  }

  getExamData(){
    this.adminService.getExamListData().subscribe((data:any)=>{
      this.examsData=data.body;
    })
  }
  getExamImages(){
    this.adminService.getExamImages().subscribe((data:any)=>{
      this.examImages=data.body;
      console.log(this.examImages);
    })
  }
  getImagePath(examName: string): string {
    if(this.examImages){
      const examImage = this.examImages.find((item:any) => item.exam_Name === examName);
    return examImage ? examImage.imagePath : 'assets/default_exam.png';
    }
    return "";
    
  }
  TakeTest(examId:any){
    this.router.navigate(['/userHome/examInstructions'],{ queryParams: { examId:examId } })

  }

}
