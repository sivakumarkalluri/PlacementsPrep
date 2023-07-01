import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-user-exams',
  templateUrl: './user-exams.component.html',
  styleUrls: ['./user-exams.component.css']
})
export class UserExamsComponent implements OnInit{

  examData:any;
  examDesc:any;
  constructor(private adminService:AdminService,private router:Router){}


  ngOnInit(): void {
    this.getCRUDExamData();
    this.getExamList();
}
getCRUDExamData(){
  this.adminService.getCRUDExamData().subscribe((data:any)=>{
    this.examData=data.body;
    console.log(this.examData);
    this.processData(this.examData);
    if(this.examData){
      this.getExamImages();

    }
  })
}
getImagePath(examName: string): string {
  if(this.examImages){
    const examImage = this.examImages.find((item:any) => item.exam_Name === examName);
  return examImage ? examImage.imagePath : 'assets/default_exam.png';
  }
  return "assets/default_exam.png";
  
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
  examImages:any;
  getExamImages(){
    this.adminService.getExamImages().subscribe((data:any)=>{
      this.examImages=data.body;
      console.log(this.examImages);
    })
  }

  getExamDescription(examId: number): string {
    if(this.examDesc){
    const exam = this.examDesc.find((item:any) => item.examID === examId);
    return exam ? exam.examDescription : '';
    }
    return "";
  }

  getExamList(){
    this.adminService.getExamListData().subscribe((data:any)=>{
      this.examDesc=data.body;
      console.log(this.examDesc);
    })
  }

  TakeTest(examId:any){
    this.router.navigate(['/userHome/examInstructions'],{ queryParams: { examId:examId } })

  }

}
