import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { AdminService } from 'src/app/Services/admin/admin.service';

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.css']
})
export class UserResultsComponent implements OnInit{

  constructor(private userService:UserService,private adminService:AdminService,private router:Router){}
  
  originalUserResults: any[] = [];
  P: number = 1;
  userId:any;
  userResults:any;
  categories: string[] = [];
  exams: string[] = [];
  ngOnInit(): void {
    this.userId=this.userService.getUserId();
      console.log("User Id :"+this.userId);
      if(this.userId){
        this.getUserResults();
        this.getCategoryExamData();
      }
      
  }
  applyFilters(): void {
    let filteredResults = this.originalUserResults;

    const subject = (document.querySelector('.myDiv1 select') as HTMLSelectElement).value;
    if (subject !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.exam_Name === subject;
      });
    }

    const passFail = (document.querySelector('.myDiv2 select') as HTMLSelectElement).value;
    if (passFail !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.passOrFail === passFail;
      });
    }

    const category = (document.querySelector('.myDiv3 select') as HTMLSelectElement).value;
    if (category !== 'none') {
      filteredResults = filteredResults.filter((result: any) => {
        return result.category_Name === category;
      });
    }

    this.userResults = filteredResults;
  }

  // search
  

  // sorting for Subject
  searchExam(): void {
    this.applyFilters();
  }

  // sorting for pass/fail
  searchPassFail(): void {
    this.applyFilters();
  }

  // sorting for category
  searchCategory(): void {
    this.applyFilters();
  }

  getCategoryExamData() {
    this.adminService.getCategories().subscribe((data: any) => {
      if (data.body) {
        for (const result of data.body) {
          console.log(result);
          if (result.categoryName) {
            this.categories.push(result.categoryName);
          }
        }
      }
    });

    this.adminService.getCRUDExamData().subscribe((data: any) => {
      if (data.body) {
        for (const result of data.body) {
          console.log(result);
          if (result.exam_Name) {
            this.exams.push(result.exam_Name);
          }
        }
      }
    });
  }
 

  getUserResults(){
    this.userService.getUserResultsAll(this.userId).subscribe((data:any)=>{
      this.userResults=data.body;
      console.log("user Results all : "+this.userResults);
      this.originalUserResults = data.body;
    })
  }

  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  
    this.userResults.sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return this.reverse ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return this.reverse ? -1 : 1;
      }
      return 0;
    });
  }


  AnswerSheet(id:any){
    this.router.navigate(['/userHome/AnswerSheet'],{ queryParams: { testId:id } })

    console.log("testId : "+id);
  }

}
